// ======================================================================
//                        plugins/vip/upgrade.ts
//         核心：解析 TXID → 升级 VIP → 更新数据库 → 推广返佣
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { addVipRecord } from "../../db/vipdb.ts";
import { addWalletDeposit } from "../../db/walletdb.ts";
import { addReferralIncome } from "../../db/referraldb.ts";

import { getPlanDays, getPlanName } from "./check.ts";
import { sendText } from "../../core/send.ts";


// ======================================================================
//                     你设置的 VIP 套餐价格（USDT）
// ======================================================================
export const VIP_PRICE = {
  weekly: 5,
  monthly: 15,
  season: 38,
  yearly: 158,
  lifetime: 888,
};


// ======================================================================
//                  验证 TXID 是否有效（你可接真实链）
// ======================================================================
// ⚠ 现在是“自动成功模式”，后期你要接链可替换这里；
export async function verifyTxid(txid: string): Promise<boolean> {
  if (txid.length < 10) return false;
  return true;
}


// ======================================================================
//               主入口：用户输入 pay txid 自动升级 VIP
// ======================================================================
export async function upgradeVIP(uid: number, txid: string, plan: string) {
  const user = await getUser(uid);

  // 1) 检查计划类型
  if (!VIP_PRICE[plan as keyof typeof VIP_PRICE]) {
    return await sendText(uid, "❌ 套餐不存在，请重新选择套餐");
  }

  const price = VIP_PRICE[plan as keyof typeof VIP_PRICE];
  const days = getPlanDays(plan);
  const planName = getPlanName(plan);


  // 2) 验证 TXID（你以后接链就改 verifyTxid）
  const valid = await verifyTxid(txid);
  if (!valid) {
    return await sendText(uid, "❌ 无效的 TXID，请检查后重试");
  }


  // 3) 钱包记录充值
  await addWalletDeposit(uid, price, txid, `VIP-${plan}`);


  // 4) 推广返佣（如果这个用户是别人邀请的）
  if (user.ref_by) {
    // VIP 返佣：40%（你设定的）
    const rate = 0.40;  
    const income = price * rate;

    await addReferralIncome(user.ref_by, uid, income);
  }


  // 5) 计算新的 VIP 到期时间
  const now = Date.now();
  const old = user.vip_until && user.vip_until > now ? user.vip_until : now;
  const expires = old + days * 24 * 60 * 60 * 1000;


  // 6) 更新用户数据库
  user.vip_until = expires;
  user.last_vip_plan = plan;
  await saveUser(uid, user);

  // VIP 开通记录（给后台）
  await addVipRecord(uid, plan, price, txid, expires);


  // 7) 返回成功信息
  const d = new Date(expires).toLocaleString();

  return await sendText(uid, 
    `🎉 <b>VIP 升级成功！</b>\n\n` +
    `🧾 套餐：${planName}\n` +
    `💳 金额：${price} USDT\n` +
    `⏱ 到期时间：${d}\n` +
    `\n感谢你的支持 ❤️`
  );
}

