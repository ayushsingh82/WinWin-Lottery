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
import { Bool, Field, Poseidon, Provable, PublicKey, Struct } from "o1js";
import { LimitOrders } from "./limit-order"

export class Pool extends Struct({
    tokenA: TokenId,
    tokenB: TokenId,
    tokenAmountA: Balance,
    tokenAmountB: Balance,
}) {
    public static from(
        tokenA: TokenId,
        tokenB: TokenId,
        tokenAmountA: Balance,
        tokenAmountB: Balance
    ) {
        return new Pool({
            tokenA,
            tokenB,
            tokenAmountA,
            tokenAmountB,
        });
    }

    public static getPoolId(tokenA: TokenId, tokenB: TokenId) {
        return Poseidon.hash([tokenA, tokenB]);
    }
}

@runtimeModule()
export class PoolModule extends RuntimeModule<{}> {
    @state() public pools = StateMap.from<Field, Pool>(Field, Pool);
    @state() public poolIds = StateMap.from<Field, Field>(Field, Field);
    @state() public poolCount = State.from(Field);
    public constructor(
        @inject("Balances") private balances: Balances,
        @inject("LimitOrders") private limitOrders: LimitOrders
    ) {
        super();
    }

    @runtimeMethod()
    public async createPool(
        tokenA: TokenId,
        tokenB: TokenId,
        tokenAmountA: Balance,
        tokenAmountB: Balance,
        requester: PublicKey,
        lp_requested: Balance
    ) {
        // deterministic hash needed to generate pool id
        const smallerTokenId = Provable.if(tokenA.lessThan(tokenB), tokenA, tokenB);
        const largerTokenId = Provable.if(tokenA.lessThan(tokenB), tokenB, tokenA);
        const poolId = Poseidon.hash([smallerTokenId, largerTokenId]);
        const poolAccount = PublicKey.fromGroup(
            Poseidon.hashToGroup([poolId, smallerTokenId, largerTokenId])
        );
        const currentPool = await this.pools.get(poolId);
        assert(currentPool.isSome.not(), "Pool already exists");
        assert(tokenA.equals(tokenB).not(), "Tokens must be different");
        const pool = Pool.from(tokenA, tokenB, tokenAmountA, tokenAmountB);
        const requesterBalanceA = await this.balances.getBalance(tokenA, requester);
        assert(requesterBalanceA.greaterThanOrEqual(tokenAmountA));
        const requesterBalanceB = await this.balances.getBalance(tokenB, requester);
        assert(requesterBalanceB.greaterThanOrEqual(tokenAmountB));
        await this.balances.transfer(tokenA, requester, poolAccount, tokenAmountA);
        await this.balances.transfer(tokenB, requester, poolAccount, tokenAmountB);
        // what if overflow?
        // const lp_amount_threshold = tokenAmountA.mul(tokenAmountB);
        // const requested_square = lp_requested.mul(lp_requested);
        // assert(lp_amount_threshold.greaterThanOrEqual(requested_square));
        // await this.balances.mintToken(poolId, this.transaction.sender.value, lp_requested);
        // await this.pools.set(poolId, pool);

        const currentCount = await this.poolCount.get();
        await this.poolIds.set(currentCount.value, poolId);
        await this.poolCount.set(Field.from(currentCount.value.add(1)));
    }

    @runtimeMethod()
    public async addLiquidityToEmpty(
        tokenA: TokenId,
        tokenB: TokenId,
        tokenAmountA: Balance,
        tokenAmountB: Balance,
        requester: PublicKey,
        lp_requested: Balance
    ) {
        const smallerTokenId = Provable.if(tokenA.lessThan(tokenB), tokenA, tokenB);
        const largerTokenId = Provable.if(tokenA.lessThan(tokenB), tokenB, tokenA);
        const poolId = Poseidon.hash([smallerTokenId, largerTokenId]);
        const pool = await this.pools.get(poolId);
        assert(pool.isSome, "Pool does not exist");
        assert(lp_requested.greaterThan(Balance.from(0)), "LP tokens must be greater than 0");

        const poolAccount = PublicKey.fromGroup(
            Poseidon.hashToGroup([poolId, smallerTokenId, largerTokenId])
        );

        // const lpTotal = await this.balances.getCirculatingSupply(poolId);

        // assert(lpTotal.equals(Balance.from(0)), "Pool is not empty");
        // const requesterBalanceA = await this.balances.getBalance(tokenA, requester);
        // assert(requesterBalanceA.greaterThanOrEqual(tokenAmountA));
        // const requesterBalanceB = await this.balances.getBalance(tokenB, requester);
        // assert(requesterBalanceB.greaterThanOrEqual(tokenAmountB));
        // await this.balances.transfer(tokenA, requester, poolAccount, tokenAmountA);
        // await this.balances.transfer(tokenB, requester, poolAccount, tokenAmountB);
        // const lp_amount_threshold = tokenAmountA.mul(tokenAmountB);
        // const requested_square = lp_requested.mul(lp_requested);
        // assert(lp_amount_threshold.greaterThanOrEqual(requested_square));
        // await this.balances.mintToken(poolId, this.transaction.sender.value, lp_requested);
        // const updatedPool = Pool.from(tokenA, tokenB, tokenAmountA, tokenAmountB);
        // await this.pools.set(poolId, updatedPool);
    }
}
