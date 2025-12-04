// ======================================================================
//                               types.ts
//       全系统统一类型定义（主机器人 + 子机器人 + 插件 + DB）
// ======================================================================


// ------------------------------------------------------------
// Telegram 基础类型（Message / CallbackQuery / Update）
// ------------------------------------------------------------
export interface From {
  id: number;
  is_bot: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface Chat {
  id: number;
  type: string; // private / group / supergroup / channel
}

export interface Message {
  message_id: number;
  from: From;
  chat: Chat;
  date: number;
  text?: string;
  photo?: any[];
  video?: any;
  sticker?: any;
  caption?: string;
  reply_to_message?: Message;
}

export interface CallbackQuery {
  id: string;
  from: From;
  message: Message;
  data?: string;
}

export interface Update {
  update_id: number;
  message?: Message;
  callback_query?: CallbackQuery;
}


// ======================================================================
//                       主机器人数据结构（userdb）
// ======================================================================
export interface UserData {
  id?: number;

  // 创建绑定时间
  created_at?: number;

  // 多语言
  lang?: string;

  // AI 使用记录
  ai?: {
    start: number;   // 当天开始使用的时间
    used: number;    // 已用秒数（可选）
  };

  // VIP 到期时间
  vip_until?: number;

  // 推广系统
  referral_code?: string;
  ref_by?: number;                 // 被谁邀请
  referral_children?: number[];    // 下级ID
  referral_income?: number;        // 推广收入 USDT

  // 每日次数限制
  daily?: {
    [key: string]: { ts: number; count: number };
  };

  // 子机器人绑定
  subbots?: number[]; // 机器人ID列表

  // 钱包字段
  wallet?: {
    balance: number;              // 余额
    ledger: WalletRecord[];       // 资金记录
  };
}


// ======================================================================
//                     VIP 数据结构（vipdb）
// ======================================================================
export interface VipRecord {
  user_id: number;
  plan: string;       // weekly / monthly / season / yearly / lifetime
  amount: number;     // USDT
  start: number;
  end: number;
  txid?: string;
}


// ======================================================================
//                  子机器人数据结构（subbotdb）
// ======================================================================
export interface SubBotData {
  owner_id: number;          // 绑定者ID
  bot_token: string;
  bot_user: string;          // @xxx
  bot_id: number;

  created_at: number;

  // 子机器人按钮（九宫格）
  buttons: SubBotButton[];

  // 用户列表
  users: SubBotUser[];

  // 统计计数
  stats: {
    total_users: number;
    new_users_today: number;
    clicks: number;
  };
}

export interface SubBotButton {
  id: string;
  text: string;
  url?: string;
  data?: string;
  row?: number;
}

export interface SubBotUser {
  id: number;
  first_name?: string;
  username?: string;
  language_code?: string;
  joined: number;
}


// ======================================================================
//                        钱包系统（walletdb）
// ======================================================================
export type WalletRecordType =
  | "deposit"
  | "withdraw"
  | "consume"
  | "refund";

export interface WalletRecord {
  id: string;
  type: WalletRecordType;
  amount: number;     // 正/负
  time: number;
  remark?: string;
}


// ======================================================================
//                            供需 (supplydb)
// ======================================================================
export interface SupplyPost {
  id: string;
  user_id: number;
  title: string;
  content: string;
  contact: string;
  created_at: number;
  views: number;

  top?: boolean;
  top_end?: number;      // 置顶到期
}


// ======================================================================
//                   广告系统 (addb)
// ======================================================================
export interface AdSlot {
  id: string;
  title: string;         // 广告位名称
  enabled: boolean;
  photo?: string;        // 图片广告
  url?: string;          // 点击跳转
  text?: string;         // 文本说明
}

export interface AdsConfig {
  slots: AdSlot[];       // 所有广告位
}


// ======================================================================
//                   推广系统 (referraldb)
// ======================================================================
export interface ReferralRecord {
  user_id: number;
  child_id: number;
  amount: number;   // 返佣（USDT）
  time: number;
}


// ======================================================================
//                    AI 模块类型 (plugins/ai)
// ======================================================================
export interface AiResponse {
  text: string;        // AI 返回内容
  tokens?: number;     // Token 用量
}
