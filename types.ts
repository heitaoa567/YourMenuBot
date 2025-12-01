// =====================================================
//                      types.ts
//       全局类型定义（Update / User / SubBot 等）
// =====================================================

// =========================
// Telegram 基础类型
// =========================

export interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface Message {
  message_id: number;
  from: TelegramUser;
  chat: {
    id: number;
    type: string;
  };
  date: number;
  text?: string;
  photo?: any[];
  document?: any;
  video?: any;
  audio?: any;
  caption?: string;
}

export interface CallbackQuery {
  id: string;
  from: TelegramUser;
  message: Message;
  data?: string;
}

export interface Update {
  update_id?: number;
  message?: Message;
  callback_query?: CallbackQuery;
}



// =========================
//          用户结构
// =========================
export interface UserData {
  created_at: number;

  // 语言
  lang: string;

  // AI 使用
  ai_used_today?: number;
  ai_last_reset?: number;
  ai_start?: number;

  // VIP
  isVIP?: boolean;
  vip_until?: number;
  vip_level?: "weekly" | "monthly" | "season" | "yearly" | "lifetime";

  // 推广
  referrals?: number;
  referral_clicks?: number;
  referral_income?: number;

  // 子机器人绑定功能
  waiting_subbot_token?: boolean;
  subbots?: SubBotInfo[];
}



// =========================
//        子机器人结构
// =========================
export interface SubBotInfo {
  bot_token: string;        // Token
  bot_id: number;           // Telegram bot ID
  bot_username: string;     // @username
  created_at: number;
  expires_at?: number;      // 到期时间（VIP 用户可延长）
}



// =========================
//       钱包结构（USDT）
// =========================
export interface WalletRecord {
  uid: number;
  amount: number;
  type: "deposit" | "withdraw";
  txid?: string;
  time: number;
}



// =========================
//     供需结构 Supply
// =========================
export interface SupplyItem {
  id: string;            // 唯一 ID
  uid: number;           // 发布者
  title: string;
  desc: string;
  contact: string;
  created_at: number;
  views: number;
  promoted?: boolean;    // 是否置顶
}



// =========================
//        广告结构 Ads
// =========================
export interface AdItem {
  id: string;
  title: string;
  img: string;
  url: string;
  enabled: boolean;
}


// =========================
//    Router 中的返回类型
// =========================
export type RouterResponse = Promise<Response | void>;

