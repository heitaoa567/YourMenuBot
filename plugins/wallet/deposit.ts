// ==================================================================
//                    plugins/wallet/deposit.ts
//                USDT-TRC20 充值入口 + 处理逻辑
// ==================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { getWallet, saveWallet, pushRecord } from "../../db/walletdb.ts";
import { sendText } from "../../core/send.ts";
import { T } from "../lang/index.ts";
import { validateTxid } from "./tron.ts";   // 未来扩展：TRON 自动验证
import { applyVIPUpgrade } from "../vip/upgrade.ts";


// 你的默认 USDT 地址（支持从环境变量读取）
const USDT_ADDR = Deno.env.get("USDT_ADDRESS") ||
  "TEJTdBXKK49CuSnoh2GnCgmXr6sbCDXJHh";


// ==================================================================
//                    显示充值页面（按钮 → deposit）
// ==================================================================
export async function showDeposit(uid: number) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  const text = [
    `💰 <b>${T(lang, "wallet_deposit_title")}</b>`,
    "",
    `请向以下地址充值 USDT（TRC20）：`,
    "",
    `💎 <code>${USDT_ADDR}</code>`,
    "",
    `充完以后发送：`,
    `👉 <b>pay TXID</b>`,
    "",
    `例如：`,
    `<code>pay abcd1234ef567890...</code>`,
    "",
    `系统将自动确认并到账。`,
  ].join("\n");

  const keyboard = {
    inline_keyboard: [
      [{ text: T(lang, "wallet_records"), callback_data: "wallet_records" }],
      [{ text: T(lang, "back"), callback_data: "back_main" }]
    ]
  };

  await sendText(uid, text, keyboard);
}



// ==================================================================
//                   用户发送 pay TXID → 处理充值
// ==================================================================
export async function handleDeposit(uid: number, txid: string) {
  const user = await getUser(uid);
  const wallet = await getWallet(uid);
  const lang = user.lang || "en";

  // ==========================
  //   基础格式检查
  // ==========================
  if (txid.length < 10) {
    await sendText(uid, T(lang, "tx_invalid"));
    return;
  }

  // ==========================
  //   验证 TXID（可扩展）
  // ==========================
  const valid = await validateTxid(txid);

  if (!valid) {
    await sendText(uid, T(lang, "tx_invalid"));
    return;
  }

  // 【测试模式】————————————
  // 系统暂时认为充值金额 = 10 USDT
  const amount = 10;

  wallet.balance += amount;
  wallet.referral_income += 0; // 有返佣再加
  await saveWallet(uid, wallet);

  // 添加账单记录
  await pushRecord(uid, {
    type: "deposit",
    amount,
    txid,
    time: Date.now(),
  });

  // ==========================
  //   如果正在购买 VIP → 自动开通
  // ==========================
  if (user.buying_vip) {
    const plan = user.buying_vip; // weekly/monthly/season/year/lifetime

    const result = await applyVIPUpgrade(uid, plan, amount);
    user.buying_vip = null;
    await saveUser(uid, user);

    await sendText(uid, result);
    return;
  }

  // ==========================
  //   正常充值完成提示
  // ==========================
  await sendText(
    uid,
    `✅ ${T(lang, "wallet_deposit_success")} +${amount} USDT\n\n当前余额：${wallet.balance} USDT`
  );
}


