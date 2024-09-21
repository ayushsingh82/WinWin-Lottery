import "reflect-metadata";
import { TestingAppChain } from "@proto-kit/sdk";
import { BalancesKey, TokenId, UInt64 } from "@proto-kit/library";
import { PrivateKey } from "o1js";
import { Vault } from "../../../src/runtime/modules/vault/vault";
import { Balances } from "../../../src/runtime/modules/balances";
import { YieldSource } from "../../../src/runtime/modules/vault/yieldSource";
import { log } from "@proto-kit/common";

log.setLevel("ERROR");

describe("vault", () => {
    it("should demonstrate minting token", async () => {
        const appChain = TestingAppChain.fromRuntime({
            Vault,
            Balances,
            YieldSource,
        });

        appChain.configurePartial({
            Runtime: {
                Balances: {
                    totalSupply: UInt64.from(10000),
                },
                Vault: {},
                YieldSource: {},
            },
        });

        await appChain.start();

        const alicePrivateKey = PrivateKey.random();
        const alice = alicePrivateKey.toPublicKey();
        const tokenId = TokenId.from(1);
        appChain.setSigner(alicePrivateKey);

        const vault = appChain.runtime.resolve("Vault");
        const balances = appChain.runtime.resolve("Balances");

        const key = new BalancesKey({ tokenId, address: alice });
        const balance = await appChain.query.runtime.Balances.balances.get(key);
        expect(balance?.toBigInt()).toBe(undefined);

        const tx1 = await appChain.transaction(alice, async () => {
            await balances.mintToken(tokenId, alice, UInt64.from(1000));
        });
        await tx1.sign();
        await tx1.send();
        await appChain.produceBlock();

        const balance2 = await appChain.query.runtime.Balances.balances.get(key);
        expect(balance2?.toBigInt()).toBe(1000n);

        const tx2 = await appChain.transaction(alice, async () => {
            await vault.setDepositShare(TokenId.from(17));
        });
        await tx2.sign();
        await tx2.send();
        await appChain.produceBlock();

        const shareId = await appChain.query.runtime.Vault.depositShare.get();
        expect(shareId?.toBigInt()).toBe(17n);

        const tx3 = await appChain.transaction(alice, async () => {
            await vault.deposit(tokenId, UInt64.from(1000), alice);
        });
        await tx3.sign();
        await tx3.send();
        await appChain.produceBlock();

        const balance3 = await appChain.query.runtime.Balances.balances.get(key);
        expect(balance3?.toBigInt()).toBe(0n);
        const depositKey = new BalancesKey({ tokenId: TokenId.from(17), address: alice });
        const depositBalance = await appChain.query.runtime.Balances.balances.get(depositKey);
        expect(depositBalance?.toBigInt()).toBe(1000n);

    }, 1_000_000);
})