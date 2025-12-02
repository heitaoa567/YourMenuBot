// ======================================================================
//                   plugins/vip/handler.ts
//      用户发送 TXID → 钱包验证 → 开通/续费 VIP
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { sendText } from "../../core/send.ts";

import {
  onVIPExtend,
  onVIPTxid,
  VIP_PRICES
} from "./index.ts";

import { validateTxid, checkUSDTReceived } from "../wallet/verify.ts";  // 钱包验证模块
import type { Message } from "../../types.ts";


// ======================================================================
//          用户输入的每一条消息都会经过这里（由 Router 调用）
// ======================================================================
export async function onVIPMessage(uid: number, text: string, msg: Message) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  // 如果用户没有进入“等待 TXID 状态” → 不处理
  const plan = user.waiting_txid_for_vip;
  if (!plan) return false;

  // 这里就是 TXID（用户输入的）
  const txid = text.trim().toLowerCase();

  // ================================
  //           1. 检查 TXID 格式
  // ================================
  if (!validateTxid(txid)) {
    await sendText(uid, "❌ TXID 格式无效，请检查后重试。");
    return true;
  }

  // ================================
  //     2. 向钱包验证是否真的收到 USDT
  // ================================
  const received = await checkUSDTReceived(uid, txid, VIP_PRICES[plan]);

  if (!received) {
    await sendText(uid, "⚠ 等待链上确认中，请稍后重试…");
    return true;
  }

  // ================================
  //   3. 真正到账 → 开通 VIP / 续费
  // ================================
  await onVIPExtend(uid, plan, lang);

  return true;
}

