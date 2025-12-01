// =====================================================
//                     core/utils.ts
//       系统通用工具函数（唯一ID / 时间 / 格式化）
// =====================================================


// -----------------------------
// 生成唯一 ID（供需/广告/记录）
// -----------------------------
export function uid() {
  return crypto.randomUUID();
}



// -----------------------------
//   获取当前时间戳（秒 / 毫秒）
// -----------------------------
export function nowMs() {
  return Date.now();
}

export function nowSec() {
  return Math.floor(Date.now() / 1000);
}



// -----------------------------
// 格式化日期
// -----------------------------
export function formatTime(ms: number) {
  const d = new Date(ms);
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const h = d.getHours().toString().padStart(2, "0");
  const min = d.getMinutes().toString().padStart(2, "0");

  return `${y}-${m}-${day} ${h}:${min}`;
}



// -----------------------------
// 是否跨天 → 用于 AI 每日重置
// -----------------------------
export function isNewDay(lastTime: number) {
  const last = new Date(lastTime);
  const now = new Date();

  return (
    last.getDate() !== now.getDate() ||
    last.getMonth() !== now.getMonth() ||
    last.getFullYear() !== now.getFullYear()
  );
}



// -----------------------------
// 随机字符串（管理员密码等）
// -----------------------------
export function randomString(len = 32) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}



// -----------------------------
// 安全过滤（防注入）
// -----------------------------
export function safe(str = "") {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "'")
    .trim();
}



// -----------------------------
// 统一数字格式化（推广/收益）
// -----------------------------
export function formatNumber(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 0 });
}



// -----------------------------
// VIP 时间工具
// -----------------------------
export function addDays(days: number) {
  return nowMs() + days * 24 * 60 * 60 * 1000;
}

export function addHours(hours: number) {
  return nowMs() + hours * 60 * 60 * 1000;
}

export function addYears(years: number) {
  return nowMs() + years * 365 * 24 * 60 * 60 * 1000;
}



// -----------------------------
// USDT 金额格式 (2位小数)
// -----------------------------
export function usdt(n: number) {
  return Number(n).toFixed(2);
}



// -----------------------------
// 把秒转换成 “xx小时xx分钟”
// -----------------------------
export function timeLeft(ms: number) {
  const sec = Math.floor(ms / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);

  if (h > 0) return `${h} 小时 ${m} 分钟`;
  return `${m} 分钟`;
}

