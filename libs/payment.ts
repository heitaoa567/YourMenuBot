import { getUser, saveUser } from "../db/userdb.ts";
import { LANG } from "./languages.ts";

// 你的 TRC20 地址
const USDT_ADDRESS = Deno.env.get("USDT_ADDRESS") || "TEJTdBXKK49CuSnoh2GnCgmXr6sbCDXJHh";

const plans = {
  week: 5,
  month: 10,
  season: 25,
  year: 80,
};

export function getPaymentInfo(userLang = "en") {
  const L = LANG[userLang];

  return `
💎 *VIP 充值方式（USDT-TRC20）*

请向以下地址转账：

📥 *充值地址：*
\`${USDT_ADDRESS}\`

📦 *套餐价格：*
• 周卡：5U
• 月卡：10U
• 季卡：25U
• 年卡：80U

支付完成后发送：

👉  \`pay TXID 套餐名\`

示例：
\`pay 83js8d9d9sjsd week\`
  `;
}

export async function handlePayment(id: number, txid: string) {
  const user = await getUser(id);
  const now = Math.floor(Date.now() / 1000);

  // 默认给 7 天（可改）
  const addDays = 7;
  const seconds = addDays * 86400;

  user.vip_until = (user.vip_until > now ? user.vip_until : now) + seconds;

  await saveUser(id, user);

  return `
🎉 *充值成功！*
TXID：${txid}

你的 VIP 已延长 *${addDays} 天*
到期时间：*${new Date(user.vip_until * 1000).toLocaleString()}*
  `;
}
