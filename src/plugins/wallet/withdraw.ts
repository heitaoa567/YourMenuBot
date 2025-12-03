// ======================================================================
//                       plugins/wallet/withdraw.ts
//                           用户提现
// ======================================================================

import { getBalance, addBalance } from "../../db/walletdb.ts";
import { sendText } from "../../core/send.ts";

const ADMIN_ID = Number(Deno.env.get("ADMIN_ID") || 0);

export async function onWithdraw(uid: number) {
  const bal = await getBalance(uid);

  await sendText(
    uid,
    `📤 <b>提现</b>\n\n可提现余额：${bal} USDT\n\n请输入：\n<code>withdraw 金额 地址</code>\n例如：withdraw 20 TUxxxxxx`
  );
}

export async function handleWithdraw(uid: number, amount: number, address: string) {
  const bal = await getBalance(uid);

  if (amount > bal) {
    return sendText(uid, "⚠️ 余额不足");
  }

  await addBalance(uid, -amount);

  // 通知管理员
  if (ADMIN_ID) {
    await sendText(
      ADMIN_ID,
      `📤 <b>提现申请</b>\n用户：${uid}\n金额：${amount} USDT\n地址：${address}`
    );
  }

  return sendText(uid, "⏳ 提现申请已提交，等待审核。");
}

