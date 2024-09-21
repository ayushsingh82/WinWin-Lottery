import { Balance, VanillaRuntimeModules } from "@proto-kit/library";
import { ModulesConfig } from "@proto-kit/common";
import { Balances } from "./modules/balances";
import { LimitOrders } from "./modules/lottery/limit-order";
import { PoolModule } from "./modules/lottery/lottery";
import { Vault } from "./modules/vault/vault";

export const modules = VanillaRuntimeModules.with({
  Balances,
  LimitOrders,
  PoolModule,
  Vault
});

export const config: ModulesConfig<typeof modules> = {
  Balances: {
    totalSupply: Balance.from(10_000),
  },
  LimitOrders: {},
  PoolModule: {},
  Vault:{}
};

export default {
  modules,
  config,
};
