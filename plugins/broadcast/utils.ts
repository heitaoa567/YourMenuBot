// ============================================
// plugins/broadcast/utils.ts
// 广播工具函数
// ============================================

export function formatQueueItem(item: any) {
  return {
    ...item,
    time_str: new Date(item.time).toLocaleString()
  };
}

export function isValidButtonPayload(data: any) {
  return (
    typeof data === "object" &&
    typeof data.text === "string" &&
    Array.isArray(data.buttons)
  );
}

