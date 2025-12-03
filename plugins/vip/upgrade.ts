// ======================================================================
//                     plugins/vip/upgrade.ts
//      收到“pay TXID”后调用本文件 → 自动续费 / 开通 VIP
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { VIP_PLANS } from "./plans.ts";
import { addVIPDays } from "../../db/vipdb.ts";
import { addReferralIncome } from "../../db/referraldb.ts";
import { sendText } from "../../core/send.ts";

export async function upgradeVIP(uid: number, plan: string, parentUid?: number) {

  const config = VIP_PLANS[plan];
  if (!config) return "VIP 套餐不存在";

  await addVIPDays(uid, config.days);

  // 推广返利（40%）
  if (parentUid) {
    const rebate = config.price * 0.40;
    await addReferralIncome(parentUid, rebate);
  }

  return `🎉 恭喜开通 <b>${config.days} 天</b> VIP！`;
}
