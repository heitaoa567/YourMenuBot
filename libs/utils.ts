// ==========================================
//               utils.ts
//      YourMenuBot 通用工具模块
// ==========================================

/**
 * 清理用户输入，避免恶意字符影响系统
 */
export function cleanInput(text: string): string {
  return text
    .replace(/\0/g, "")       // 空字符
    .replace(/\s+/g, " ")     // 多余空格
    .trim();
}

/**
 * 判断是否为数字
 */
export function isNumber(x: any): boolean {
  return typeof x === "number" ||
    (typeof x === "string" && /^\d+$/.test(x));
}

/**
 * 格式化时间戳为日期（例如：2024-09-30）
 */
export function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * 格式化时间戳为剩余天数
 */
export function formatRemaining(timestamp: number): string {
  const now = Date.now();
  if (timestamp <= now) return "已过期";

  const diff = timestamp - now;
  const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
  return `${days} 天`;
}

/**
 * 防止 Markdown 换行混乱
 */
export function escapeMarkdown(text: string): string {
  return text
    .replace(/_/g, "\\_")
    .replace(/\*/g, "\\*")
    .replace(/`/g, "'")
    .replace(/\|/g, "\\|");
}

/**
 * 安全日志输出（避免暴露 Token）
 */
export function safeLog(msg: any) {
  try {
    console.log("[LOG]", JSON.stringify(msg));
  } catch (_) {
    console.log("[LOG]", msg);
  }
}

/**
 * 延迟（毫秒）
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
