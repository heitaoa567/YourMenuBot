// ======================================================================
//                           core/utils.ts
//                全局工具函数（AI / 限制 / 时间 / 统计）
// ======================================================================

// ------------------------------
// 时间格式化
// ------------------------------
export function ts() {
  return Math.floor(Date.now() / 1000);
}

export function formatTime(ms: number) {
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);

  let r = "";
  if (d > 0) r += `${d}天 `;
  if (h > 0) r += `${h}小时 `;
  if (m > 0) r += `${m}分钟`;
  return r.trim() || "刚刚";
}


// ------------------------------
// 生成唯一ID（供需、广播、按钮）
// ------------------------------
export function uid(prefix = "") {
  return prefix + Math.random().toString(36).substring(2, 10);
}


// ------------------------------
// 清洗用户输入（防注入 XSS）
// ------------------------------
export function clean(text: string) {
  return text
    .replace(/</g, "＜")
    .replace(/>/g, "＞")
    .replace(/script/gi, "scr1pt")
    .trim();
}


// ------------------------------
// 分页工具（供需 / 子机器人统计）
// ------------------------------
export function paginate<T>(list: T[], page: number, size: number) {
  const start = (page - 1) * size;
  return list.slice(start, start + size);
}


// ------------------------------
// 判断是否跨天（用于每日重置）
// ------------------------------
export function isNewDay(oldTs: number) {
  const old = new Date(oldTs);
  const now = new Date();

  return (
    old.getFullYear() !== now.getFullYear() ||
    old.getMonth() !== now.getMonth() ||
    old.getDate() !== now.getDate()
  );
}


// ------------------------------
// 每日限制检查（监听 / 广播）
// ------------------------------
export function checkDailyLimit(
  user: any,
  key: string,
  limit: number
): { ok: boolean; used: number; remaining: number } {
  if (!user.daily) user.daily = {};

  if (!user.daily[key] || isNewDay(user.daily[key].ts)) {
    user.daily[key] = { ts: Date.now(), count: 0 };
  }

  const used = user.daily[key].count;

  if (used >= limit) return { ok: false, used, remaining: 0 };

  user.daily[key].count++;
  const remaining = limit - user.daily[key].count;

  return { ok: true, used, remaining };
}


// ------------------------------
// AI 免费限时（分钟制）
// ------------------------------
export function checkAiLimit(user: any, freeMinutes = 30) {
  if (!user.ai) user.ai = { start: 0, used: 0 };

  // 如果跨天 → 重置
  if (isNewDay(user.ai.start)) {
    user.ai.start = Date.now();
    user.ai.used = 0;
    return { ok: true, remaining: freeMinutes * 60 };
  }

  // 累积使用秒数
  const now = Date.now();
  const secsUsed = Math.floor((now - user.ai.start) / 1000);

  if (secsUsed >= freeMinutes * 60) {
    return { ok: false, remaining: 0 };
  }

  return {
    ok: true,
    remaining: freeMinutes * 60 - secsUsed,
  };
}


// ------------------------------
// 生成推广码（唯一、短）
// ------------------------------
export function genReferral(uid: number) {
  return (uid % 1000000).toString(36);
}


// ------------------------------
// 简单延迟（调用 OpenAI 时有用）
// ------------------------------
export function delay(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}


// ------------------------------
// 避免输入超长导致崩溃（AI）
// ------------------------------
export function limitText(text: string, max = 2000) {
  if (text.length <= max) return text;
  return text.slice(0, max) + "\n...\n[内容过长，已自动截断]";
}


