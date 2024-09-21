import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod,
} from "@proto-kit/module";
import { inject } from "tsyringe";
import { assert, State, StateMap } from "@proto-kit/protocol";
import { Balances } from "../balances";
import { Balance, TokenId } from "@proto-kit/library";
import { Field, PublicKey, Struct, UInt64 } from "o1js";

export class BalanceBox extends Struct({
    balance: Balance,
    cumulative: UInt64,
    timestamp: UInt64,
}) {
    public static from(balance: Balance, cumulative: UInt64, timestamp: UInt64) {
        return new BalanceBox({
            balance,
            cumulative,
            timestamp,
        });
    }
}

export class PublicKey1 extends Struct({
    pubkey: PublicKey,
    counter: UInt64, // Counter to track the number of balance updates
}) {
    public static from(pubkey: PublicKey, counter: UInt64) {
        return new PublicKey1({
            pubkey,
            counter,
        });
    }

    public incrementCounter() {
        this.counter = this.counter.add(UInt64.from(1)); // Increment the counter by 1
    }
}

@runtimeModule()
export class Twab extends RuntimeModule<{}> {
    @state() public balanceHistory = StateMap.from<PublicKey1, BalanceBox>(PublicKey1, BalanceBox);
    
    public constructor(
        @inject("Balances") private balances: Balances,
    ) {
        super();
    }

    @runtimeMethod()
    public async addEntry(
        owner: PublicKey1,
        amount: Balance,
    ) {
        // Retrieve the current balance box for the owner
        let currentBalanceBox = await this.balanceHistory.get(owner);
        
        const lastBalance = currentBalanceBox ? currentBalanceBox.value.balance : Balance.from(0);
        const lastCumulative = currentBalanceBox ? currentBalanceBox.value.cumulative : UInt64.from(0);
        const lastTimestamp = currentBalanceBox ? currentBalanceBox.value.timestamp : UInt64.from(0);
        
        const timestampNow = UInt64.from(0); // Placeholder for the current timestamp
        const y = timestampNow.sub(lastTimestamp);
        const x = lastBalance.mul(y.value.toBigInt());
        const cumulative = lastCumulative.add(UInt64.fromFields([x.value]));

        // Create a new BalanceBox with the updated balance and cumulative value
        const newBalanceBox = BalanceBox.from(amount, cumulative, timestampNow);

        // Increment the counter for the public key
        owner.incrementCounter();

        // Save the updated balance history and counter
        await this.balanceHistory.set(owner, newBalanceBox);
    }

    // Method to reset the balance entry (for testing or clearing purposes)
    @runtimeMethod()
    public async resetEntry(owner: PublicKey1) {
        // Reset the balance to zero, but increment the counter
        const resetBalanceBox = BalanceBox.from(Balance.from(0), UInt64.from(0), UInt64.from(0));

        // Increment the counter for the public key
        owner.incrementCounter();

        // Save the reset balance
        await this.balanceHistory.set(owner, resetBalanceBox);
    }
}
