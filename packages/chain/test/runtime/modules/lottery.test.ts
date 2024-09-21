import "reflect-metadata";
import { TestingAppChain } from "@proto-kit/sdk";
import { TokenId, UInt64 } from "@proto-kit/library";
import { PrivateKey } from "o1js";
import { PoolModule } from '../../../src/runtime/modules/lottery/lottery'
import { Balances } from "../../../src/runtime/modules/balances";
import { LimitOrders } from "../../../src/runtime/modules/lottery/limit-order";
import { log } from "@proto-kit/common";

log.setLevel("ERROR");

describe("lottery", () => {
    it("should demonstrate minting token", async () => {
        const appChain = TestingAppChain.fromRuntime({
            PoolModule,
            Balances,
            LimitOrders
        });

        appChain.configurePartial({
            Runtime: {
                Balances: {
                    totalSupply: UInt64.from(10000),
                },
                PoolModule: {},
                LimitOrders: {},
            },
        });

        await appChain.start();

        const alicePrivateKey = PrivateKey.random();
        const alice = alicePrivateKey.toPublicKey();
        const token1Id = TokenId.from(0);
        const token2Id = TokenId.from(1);
        appChain.setSigner(alicePrivateKey);

        const pool = appChain.runtime.resolve("PoolModule");
        const balances = appChain.runtime.resolve("Balances");

        const tx1 = await appChain.transaction(alice, async () => {
            await balances.mintToken(token1Id, alice, UInt64.from(1000));
        });

        await tx1.sign();
        await tx1.send();
        await appChain.produceBlock();

    }, 1_000_000);
})