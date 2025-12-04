// ======================================================================
//                        plugins/vip/check.ts
//                判断用户是否 VIP（供全系统调用）
// ======================================================================

import { getVIP } from "../../db/vipdb.ts";

export async function isVIP(uid: number) {
  const vip = await getVIP(uid);
  if (!vip) return false;

  return vip.vip_until > Date.now();
}
