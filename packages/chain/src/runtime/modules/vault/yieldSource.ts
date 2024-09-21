import { runtimeMethod, RuntimeModule, runtimeModule, state } from "@proto-kit/module";
import { inject } from "tsyringe";
import { Balances } from "../balances";
import { assert, State, StateMap } from "@proto-kit/protocol";
import { Balance, TokenId } from "@proto-kit/library";
import { PublicKey, Poseidon, UInt64 } from "o1js";

@runtimeModule()
export class YieldSource extends RuntimeModule<{}> {
    @state() public stakes = StateMap.from<PublicKey, Balance>(PublicKey, Balance);
    public constructor(@inject("Balances") private balances: Balances) {
        super();
    }

    @runtimeMethod()
    public async addLiquid(token: TokenId, amount: Balance) {
        const yieldAccount = PublicKey.fromGroup(Poseidon.hashToGroup([token]));
        await this.balances.mintToken(token, yieldAccount, amount);
    }

    @runtimeMethod()
    public async stake(token: TokenId, amount: Balance, owner: PublicKey) {
        const ownerBalance = await this.balances.getBalance(token, owner);
        assert(ownerBalance.greaterThanOrEqual(amount));
        const stake = await this.stakes.get(owner);
        await this.stakes.set(owner, stake.value.add(amount));
        const yieldAccount = PublicKey.fromGroup(Poseidon.hashToGroup([token]));
        await this.balances.transfer(token, owner, yieldAccount, amount);
    }

    @runtimeMethod()
    public async unstake(token: TokenId, amount: Balance, owner: PublicKey) {
        const stake = await this.stakes.get(owner);
        assert(stake.value.greaterThanOrEqual(amount));
        await this.stakes.set(owner, stake.value.sub(amount));
        const yieldAccount = PublicKey.fromGroup(Poseidon.hashToGroup([token]));
        const amountAfterProfit = amount.mul(Balance.from(14)).div(Balance.from(10));
        await this.balances.transfer(token, yieldAccount, owner, amountAfterProfit);
    }
}