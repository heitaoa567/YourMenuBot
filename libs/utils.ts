// ======================================
// 通用工具函数（所有模块会调用）
// ======================================

// 检查是否 VIP
export function isVIP(vipUntil: number): boolean {
  return vipUntil > Date.now();
}

// 获取 VIP 剩余天数
export function vipRemainingDays(vipUntil: number): number {
  if (vipUntil <= Date.now()) return 0;
  return Math.ceil((vipUntil - Date.now()) / (24 * 60 * 60 * 1000));
}

// 检验 Token 格式是否有效
export function isValidBotToken(token: string): boolean {
  // Telegram Token 格式：1234567890:ABCDEFGxxx
  return /^[0-9]+:[a-zA-Z0-9_-]{20,}$/.test(token);
}

// 获取今天日期（用于 ChatGPT 限额）
export function getToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// 格式化时间戳
export function formatDate(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
}

// 随机字符串（可用于子机器人安全文件夹名等）
export function randomString(length: number = 12): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

