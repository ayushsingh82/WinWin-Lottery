import "reflect-metadata";
import { TestingAppChain } from "@proto-kit/sdk";
import { BalancesKey, TokenId, UInt64 } from "@proto-kit/library";
import { PrivateKey } from "o1js";
import { Balances } from "../../../src/runtime/modules/balances";
import { Twab } from "../../../src/runtime/modules/vault/twab";
import { log } from "@proto-kit/common";

log.setLevel("ERROR");

describe("twab", () => {
    it("should demonstrate minting token", async () => {
        const appChain = TestingAppChain.fromRuntime({
           Balances,
            Twab,
        });

        appChain.configurePartial({
            Runtime: {
                Twab: {}
            },
        });

        await appChain.start();

        const alicePrivateKey = PrivateKey.random();
        const alice = alicePrivateKey.toPublicKey();

    }, 1_000_000);
})