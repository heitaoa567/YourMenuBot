// ==================================================================
//                     plugins/wallet/handler.ts
//                   钱包总控（菜单 + 回调 + 文本指令）
// ==================================================================

import { getUser } from "../../db/userdb.ts";
import { sendText } from "../../core/send.ts";
import { T } from "../lang/index.ts";

import { showDeposit, handleDeposit } from "./deposit.ts";
import { showWithdraw, handleWithdraw } from "./withdraw.ts";
import { showWalletRecords } from "./records.ts";
import { showBalance } from "./balance.ts";


// ==================================================================
//                   钱包主菜单（用户点击 “钱包”）
// ==================================================================
export async function walletMenu(uid: number) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  const keyboard = {
    inline_keyboard: [
      [{ text: T(lang, "wallet_balance_menu"), callback_data: "wallet_balance" }],
      [{ text: T(lang, "wallet_deposit_menu"), callback_data: "wallet_deposit" }],
      [{ text: T(lang, "wallet_withdraw_menu"), callback_data: "wallet_withdraw" }],
      [{ text: T(lang, "wallet_records"), callback_data: "wallet_records" }],
      [{ text: T(lang, "back"), callback_data: "back_main" }]
    ]
  };

  await sendText(uid, T(lang, "wallet_title"), keyboard);
}



// ==================================================================
//               统一 callback 入口（来自 main.ts → router）
// ==================================================================
export async function onWalletCallback(uid: number, data: string) {
  switch (data) {

    case "wallet":
      await walletMenu(uid);
      return true;

    case "wallet_balance":
      await showBalance(uid);
      return true;

    case "wallet_deposit":
      await showDeposit(uid);
      return true;

    case "wallet_withdraw":
      await showWithdraw(uid);
      return true;

    case "wallet_records":
      await showWalletRecords(uid, 1);
      return true;
  }

  // 分页：wallet_records_page_2
  if (data.startsWith("wallet_records_page_")) {
    const page = Number(data.replace("wallet_records_page_", ""));
    await showWalletRecords(uid, page);
    return true;
  }

  return false;
}



// ==================================================================
//                  用户文本消息入口（提取 pay / withdraw）
// ==================================================================
export async function onWalletMessage(uid: number, text: string): Promise<boolean> {

  const lower = text.toLowerCase();

  // ==================
  // 充值：pay TXID
  // ==================
  if (lower.startsWith("pay ")) {
    const parts = text.split(" ");
    if (parts.length !== 2) return false;

    const txid = parts[1];
    await handleDeposit(uid, txid);
    return true;
  }

  // ==================
  // 提现：withdraw 20 Txxxxxx
  // ==================
  if (lower.startsWith("withdraw ")) {
    const parts = text.split(" "); // withdraw amount address
    await handleWithdraw(uid, parts);
    return true;
  }

  return false; // 不属于钱包消息
}

