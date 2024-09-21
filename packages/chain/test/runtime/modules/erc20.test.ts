import { TestingAppChain } from "@proto-kit/sdk";
import { PrivateKey, UInt64 } from "o1js";
import { ERC20 } from "../../../src/runtime/modules/erc20/erc20";
import { log } from "@proto-kit/common";

log.setLevel("ERROR");

describe("erc20", () => {
    it("should demonstrate minting token", async () => {
        const appChain = TestingAppChain.fromRuntime({
            ERC20,
        });

        appChain.configurePartial({
            Runtime: {
                ERC20: {},
                Balances: {}
            },
        });

        await appChain.start();

        const alicePrivateKey = PrivateKey.random();
        const alice = alicePrivateKey.toPublicKey();

        appChain.setSigner(alicePrivateKey);

        const erc20 = appChain.runtime.resolve("ERC20");
        const balanceBefore = await appChain.query.runtime.ERC20.balances.get(alice);
        const tx1 = await appChain.transaction(alice, async () => {
          await erc20.mint(alice, UInt64.from(1000n));
        });
        await tx1.sign();
        await tx1.send();
        await appChain.produceBlock();
        const balance = await appChain.query.runtime.ERC20.balances.get(alice);
        expect(balanceBefore?.toBigInt()).toBe(undefined);
        expect(balance?.toBigInt().toString()).toBe("1000");
    }, 1_000_000);
});