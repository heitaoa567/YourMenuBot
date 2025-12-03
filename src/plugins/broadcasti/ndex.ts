// ============================================
// plugins/broadcast/index.ts
// 广播模块统一导出 & 管理（总入口）
// ============================================

import * as Worker from "./worker";
import * as Sender from "./send";
import * as Utils from "./utils";
import * as Main from "./main";

export const Broadcast = {
  Worker,
  Sender,
  Utils,
  Main
};

