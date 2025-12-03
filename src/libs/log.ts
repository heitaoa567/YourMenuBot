// =====================================================
// libs/log.ts
// 简单可控的日志模块（支持错误/警告/提示）
// =====================================================

export const Log = {
  info(...msg: any[]) {
    console.log("ℹ️ [INFO]", ...msg);
  },

  warn(...msg: any[]) {
    console.warn("⚠️ [WARN]", ...msg);
  },

  error(...msg: any[]) {
    console.error("❌ [ERROR]", ...msg);
  },

  success(...msg: any[]) {
    console.log("✅ [SUCCESS]", ...msg);
  }
};

