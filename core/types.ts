// ========================================================
//                     core/types.ts
//   插件系统通用类型定义（上下文、插件模块、Reply）
// ========================================================

// Reply 函数类型（主程序传入插件）
export type ReplyFunction = (
  chatId: number,
  text: string,
  keyboard?: any
) => Promise<void>;

// ------------- 普通消息结构 -------------
export interface MessageContext {
  update: any;        // 原始 Telegram update
  chatId: number;     // 聊天 ID
  userId: number;     // 用户 ID
  text: string;       // 用户发送的文字
  reply: ReplyFunction; // 回复函数（插件调用）
}

// ------------- 回调按钮结构 -------------
export interface CallbackContext {
  update: any;
  chatId: number;
  userId: number;
  data: string;          // 按钮 callback_data
  reply: ReplyFunction;
}

// ------------- 插件模块结构 -------------
export interface PluginModule {
  name: string;

  // 插件可以只实现其中一个
  onMessage?: (ctx: MessageContext) => Promise<boolean | void>;
  onCallback?: (ctx: CallbackContext) => Promise<boolean | void>;
}

