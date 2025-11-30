// payment.ts
// ======================================================
// YourMenuBot VIP 支付系统（USDT-TRC20）
// ======================================================

import { LANG } from "../languages.ts";
import { getUser, saveUser } from "../db/userdb.ts";

// USDT 地址从环境变量读取
const USDT_ADDRESS = Deno.env.get("USDT_TRC20_ADDRESS") || "TEJTdBXKK49CuSnoh2GnCgmXr6sbCDXJHh";

// VIP 时长（秒）
const WEEK = 7 * 24 * 60 * 60;
const MONTH = 30 * 24 * 60 * 60;
const QUARTER = 90 * 24 * 60 * 60;
const YEAR = 365 * 24 * 60 * 60;

// ======================================================
// 显示充值方式（用户点击 VIP → Buy）
// ======================================================
export function getPaymentInfo(chatId: number) {
  const user = getUser(chatId);
  const L = LANG[user.lang || "en"];

  return `
${L.pay_title}

${L.pay_send}

\`${USDT_ADDRESS}\`

${L.pay_wait}
  `;
}

// ======================================================
// 执行充值（用户发送 pay TXID 后）
// ======================================================
export async function handlePayment(chatId: number, txid: string) {
  const user = getUser(chatId);
  const L = LANG[user.lang || "en"];

  // 模拟验证（未来可接入 API）
  if (!txid || txid.length < 10) {
    return "❌ TXID 不正确，请重新发送。格式示例：\n\npay TXIDxxxx12345";
  }

  // 测试阶段：所有 TXID 默认成功 + 赠送 1 个月 VIP
  const now = Math.floor(Date.now() / 1000);

  // VIP 已过期 → 从现在开始
  if (!user.vip_until || user.vip_until < now) {
    user.vip_until = now + MONTH;
  } else {
    // VIP 续费叠加
    user.vip_until += MONTH;
  }

  saveUser(chatId, user);

  return `
🎉 *充值成功*

您的 TXID：
\`${txid}\`

👑 VIP 已成功延长 1 个月！

到期时间：
*${new Date(user.vip_until * 1000).toLocaleString()}*

感谢您的支持 ❤️
  `;
}

// ======================================================
// 处理 VIP 时长选择
// ======================================================
export function buyVIP(chatId: number, type: string) {
  const user = getUser(chatId);
  const L = LANG[user.lang || "en"];

  let seconds = 0;
  let name = "";

  if (type === "week") { seconds = WEEK; name = L.vip_week; }
  if (type === "month") { seconds = MONTH; name = L.vip_month; }
  if (type === "quarter") { seconds = QUARTER; name = L.vip_quarter; }
  if (type === "year") { seconds = YEAR; name = L.vip_year; }

  const now = Math.floor(Date.now() / 1000);

  if (!user.vip_until || user.vip_until < now) {
    user.vip_until = now + seconds;
  } else {
    user.vip_until += seconds; // 续期叠加
  }

  saveUser(chatId, user);

  return `
🎉 *VIP ${name} 已开通成功！*

到期时间：
*${new Date(user.vip_until * 1000).toLocaleString()}*

如需续费请继续充值 ❤️
  `;
}
