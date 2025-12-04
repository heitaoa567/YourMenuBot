// ======================================================================
//                        plugins/wallet/index.ts
//             钱包插件主入口（充值 / 提现 / 余额 / 流水）
// ======================================================================

import { onDeposit } from "./deposit.ts";
import { onWithdraw } from "./withdraw.ts";
import { onWalletMessage } from "./handler.ts";
import { onWalletCallback } from "./callback.ts";

export const Wallet = {
  onMessage: onWalletMessage,
  onCallback: onWalletCallback,
  deposit: onDeposit,
  withdraw: onWithdraw,
};

