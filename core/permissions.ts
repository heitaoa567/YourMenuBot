// ==========================================
//           core/permissions.ts
//   权限系统：绑定用户 / VIP 用户 / 管理员
// ==========================================

import { getUser } from "../db/userdb.ts";

export async function isBound(uid: number): Promise<boolean> {
  const user = await getUser(uid);
  return !!user?.is_bound;
}

export async function isVIP(uid: number): Promise<boolean> {
  const user = await getUser(uid);
  return user?.vip_until && user.vip_until > Date.now();
}

export async function isAdmin(uid: number): Promise<boolean> {
  const adminList = (Deno.env.get("ADMINS") || "").split(",").map(a => Number(a.trim()));
  return adminList.includes(uid);
}
