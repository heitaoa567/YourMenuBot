// ======================================================================
//                        plugins/wallet/index.ts
//             钱包插件主入口（充值 / 提现 / 余额 / 流水）
// ======================================================================

import { onDeposit } from "./deposit.ts";
import { onWithdraw } from "./withdraw.ts";
import { onWalletMessage } from "./handler.ts";
import { onWalletCallback } from "./callback.ts";

// =====================================================
// 统一入口：由 router.ts 调用
// router.ts 中使用：
// if (data.startsWith("wallet_")) return await Wallet.handle(uid, data, ctx);
// =====================================================
export async function handle(uid: number, data: string, ctx: any) {
  return await onWalletCallback(uid, data, ctx);
}

// =====================================================
// 消息入口（当用户发文字触发钱包操作时）
// =====================================================
export const onMessage = onWalletMessage;

// =====================================================
// 提供充值和提现函数（供其他插件调用）
// =====================================================
export const deposit = onDeposit;
export const withdraw = onWithdraw;
