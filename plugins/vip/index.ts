// ======================================================================
//                        plugins/vip/index.ts
//                            VIP 主入口
// ======================================================================

import { vipMenu } from "./menu.ts";
import { onCallback as vipCallback } from "./callback.ts";
import { isVIP } from "./check.ts";

// 统一由 router.ts 调用的入口
export async function handle(uid: number, data: string, ctx: any) {
  // 处理 VIP 按钮事件
  return await vipCallback(uid, data, ctx);
}

// 主菜单入口（如果你的 handler 或 /vip 触发）
export const menu = vipMenu;

export { isVIP };
