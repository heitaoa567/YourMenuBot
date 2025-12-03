// =======================================
// plugins/admin/menus/users.ts
// 后台用户管理界面（与你现有结构完全一致）
// =======================================

import { sendMsg } from "../../../core/send";
import { Users } from "../../../userdb";
import { SubBotDB } from "../../../subbotdb";

export async function showAdminUsersMenu(ctx: any, filterList: any[] | null = null) {

  // 1. 获取用户列表（如果有搜索结果就用搜索结果）
  const users = filterList || Users.getAll();

  if (users.length === 0) {
    return sendMsg(ctx, "👥 当前没有用户。");
  }

  let text = `👥 *用户管理*\n\n共 ${users.length} 名用户：\n`;

  users.forEach((u: any, i: number) => {
    text += `\n${i + 1}. 用户：${u.id}  
语言：${u.lang || "未知"}  
邀请数：${u.referrals || 0}  
VIP 到期：${u.vip_until ? new Date(u.vip_until).toLocaleString() : "无"}`;

    text += `\n——————`;
  });

  const keyboard = {
    inline_keyboard: [
      [
        { text: "🔍 搜索用户", callback_data: "admin_search_user" }
      ],
      [
        { text: "🔙 返回后台", callback_d_

