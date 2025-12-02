// ===============================================================
// core/utils.ts （新版核心工具集）
// ===============================================================
// 适用于 YourMenuBot V3 插件框架
// - 通用工具（唯一 ID / 时间 / 随机数）
// - 文本与安全处理
// - Rate-limit（防刷）
// - 多语言 Helper
// - 权限 Helper
// - 子机器人 Helper
// - 广播工具
// ===============================================================

import { nanoid } from "https://deno.land/x/nanoid/mod.ts";
import { LANG } from "../admin/lang.ts";
import { getUser } from "../db/userdb.ts";

// ===============================================================
// 🔹 基础工具
// ===============================================================

// 生成全局唯一 ID（比 UUID 更短）
// 用于供需、钱包交易、广告等
export function uid(len: number = 16): string {
  return nanoid(len);
}

// 当前时间（毫秒）
export function now(): number {
  return Date.now();
}

// 当前时间（秒）
export function nowSec(): number {
  return Math.floor(Date.now() / 1000);
}

// 生成随机整数
export function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 安全 JSON 解析
export function safeJSON(text: string, fallback: any = null) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

// 字符串截断（防止 Telegram 超长）
export function cut(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len) + "…";
}

// Telegram Markdown 转义
export function md(text: string): string {
  return text
    .replace(/_/g, "\\_")
    .replace(/\*/g, "\\*")
    .replace(/`/g, "\\`");
}

// 判断是否为数字
export function isNum(text: string): boolean {
  return /^[0-9]+$/.test(text);
}


// ===============================================================
// 🔹 多语言 Helper
// ===============================================================

export function L(lang: string, key: string, vars: any = {}) {
  let t = LANG[key]?.[lang] || LANG[key]?.["en"] || key;

  for (const k in vars) {
    t = t.replace(`{{${k}}}`, vars[k]);
  }
  return t;
}


// ===============================================================
// 🔹 权限判断 Helper
// ===============================================================

export async function isVIP(uid: number): Promise<boolean> {
  const user = await getUser(uid);
  return user.vip_until > now();
}

export async function needVIP(uid: number): Promise<boolean> {
  const user = await getUser(uid);
  return !(user.vip_until > now());
}


// ===============================================================
// 🔹 Rate-limit（防刷）
// ===============================================================

const rateStore = new Map<number, number>();

export function rateLimit(uid: number, ms: number): boolean {
  const last = rateStore.get(uid) || 0;
  const t = now();
  if (t - last < ms) return false;

  rateStore.set(uid, t);
  return true;
}


// ===============================================================
// 🔹 子机器人 Helper
// ===============================================================

// 解析子机器人 Token
export function parseBotToken(text: string) {
  if (!text.includes(":")) return null;

  const [botId, botToken] = text.split(":");

  if (!botId || !botToken) return null;
  if (botId.length < 5 || botToken.length < 10) return null;

  return { botId, botToken };
}


// ===============================================================
// 🔹 广播工具
// ===============================================================

export function detectMessageType(msg: any): "text" | "photo" | "video" | "unknown" {
  if (msg.text) return "text";
  if (msg.photo) return "photo";
  if (msg.video) return "video";
  return "unknown";
}

export function extractMessageContent(msg: any) {
  if (msg.text) return msg.text;
  if (msg.caption) return msg.caption;
  return "";
}


// ===============================================================
// 🔹 时间格式化
// ===============================================================

export function timeFmt(ts: number): string {
  const d = new Date(ts);
  const pad = (n: number) => (n < 10 ? "0" + n : "" + n);

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes())
  );
}


// ===============================================================
// 🔹 数字格式化（用于钱包金额）
// ===============================================================

export function formatUSDT(num: number): string {
  return Number(num).toFixed(2);
}


// ===============================================================
// 🔹 分页工具（用于广告、供需、子机器人列表等）
// ===============================================================

export function paginate<T>(arr: T[], page: number, pageSize: number = 10) {
  const total = arr.length;
  const pages = Math.ceil(total / pageSize);

  const data = arr.slice((page - 1) * pageSize, page * pageSize);

  return { total, pages, page, data };
}

