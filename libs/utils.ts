// =====================================================
// libs/utils.ts
// 全局工具方法（格式化、时间、随机、转换）
// =====================================================

export const Utils = {
  // --------------------------
  // 时间格式
  // --------------------------
  time() {
    return Math.floor(Date.now() / 1000);
  },

  formatTime(ts: number) {
    const date = new Date(ts * 1000);
    return date.toLocaleString("en-US", { hour12: false });
  },

  // --------------------------
  // 随机数
  // --------------------------
  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // --------------------------
  // 文本工具
  // --------------------------
  trim(text: string) {
    return text ? text.trim() : "";
  },

  escapeHTML(text: string) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  },

  // --------------------------
  // 深拷贝
  // --------------------------
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
};

