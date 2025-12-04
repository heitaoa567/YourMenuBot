// ============================================
// plugins/broadcast/index.ts
// 广播模块统一导出 & 兼容 router.ts 的主要入口
// ============================================

import * as Worker from "./worker.ts";
import * as Sender from "./send.ts";
import * as Utils from "./utils.ts";
import * as Main from "./main.ts";

// =====================================================
// 统一入口：由 router.ts 调用
// router.ts 中使用：
// if (data.startsWith("broadcast_")) return await Broadcast.handle(uid, data, ctx);
// =====================================================
export async function handle(uid: number, data: string, ctx: any) {
  // 让 main.ts 处理所有 broadcast_xxx 按钮事件
  if (Main && typeof Main.onCallback === "function") {
    return await Main.onCallback(uid, data, ctx);
  }

  console.error("Broadcast.onCallback 未实现，请检查 main.ts");
  return null;
}

// =====================================================
// 提供全部模块给其他逻辑调用
// =====================================================
export const WorkerModule = Worker;
export const SenderModule = Sender;
export const UtilsModule = Utils;
export const MainModule = Main;
