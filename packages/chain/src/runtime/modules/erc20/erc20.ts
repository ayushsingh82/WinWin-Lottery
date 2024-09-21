import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod,
} from "@proto-kit/module";
import { State, StateMap, assert } from "@proto-kit/protocol";
import { Field, PublicKey, Provable, UInt64 } from "o1js";

export const errors = {
    senderNotFrom: () => "Sender does not match 'from'",
    userDoesNotHave: (tokenSymbol: Field) =>
        "User does not have " + tokenSymbol + " balance",
    fromBalanceInsufficient: () => "From balance is insufficient",
    burnBalanceInsufficient: () => "Burn balance is insufficient",
};

@runtimeModule()
export class ERC20 extends RuntimeModule<Record<string, never>> {
    @state() public balances = StateMap.from<PublicKey, UInt64>(
        PublicKey,
        UInt64
    );
    @state() public address = State.from<PublicKey>(PublicKey);
    @state() public tokenSymbol = State.from<Field>(Field);

    public constructor() {
        super();
    }

    @runtimeMethod()
    public async setSymbol(symbol: Field): Promise<any> {
        await this.tokenSymbol.set(symbol);
    }
    @runtimeMethod()
    public async setTokenAddress(address: PublicKey): Promise<any> {
        await this.address.set(address);
    }
    @runtimeMethod()
    public async balanceOf(address: PublicKey): Promise<UInt64> {
        const balance = await this.balances.get(address);
        return Provable.if(balance.isSome, UInt64, balance.value, UInt64.from(0));
    }
    @runtimeMethod()
    public async setBalance(address: PublicKey, amount: UInt64): Promise<any> {
        await this.balances.set(address, amount);
    }

    @runtimeMethod()
    public async mint(address: PublicKey, amount: UInt64): Promise<any> {
        const balance = await this.balanceOf(address);
        const newBalance = balance.add(amount);
        await this.setBalance(address, newBalance);
    }
    @runtimeMethod()
    public async burn(address: PublicKey, amount: UInt64): Promise<any> {
        const balance = await this.balanceOf(address);
        assert(
            balance.greaterThanOrEqual(amount),
            errors.burnBalanceInsufficient()
        );
        const newBalance = balance.sub(amount);
        await this.setBalance(address, newBalance);
    }
    @runtimeMethod()
    public async transfer(from: PublicKey, to: PublicKey, amount: UInt64): Promise<any> {
        const fromBalance = await this.balanceOf(from);
        const toBalance = await this.balanceOf(to);

        const fromBalanceIsSufficient = fromBalance.greaterThanOrEqual(amount);

        assert(fromBalanceIsSufficient, errors.fromBalanceInsufficient());

        // used to prevent field underflow during subtraction
        const paddedFrombalance = fromBalance.add(amount);
        const safeFromBalance = Provable.if(
            fromBalanceIsSufficient,
            UInt64,
            fromBalance,
            paddedFrombalance
        );

        const newFromBalance = safeFromBalance.sub(amount);
        const newToBalance = toBalance.add(amount);

        await this.setBalance(from, newFromBalance);
        await this.setBalance(to, newToBalance);
    }
    @runtimeMethod()
    public async getAddress(): Promise<PublicKey> {
        const address = await this.address.get();
        return address.value;
    }
}