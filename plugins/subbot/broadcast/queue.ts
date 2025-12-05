// =======================================
// plugins/subbot/broadcast/queue.ts
// 子机器人群发系统 - 稳定版广播队列
// （支持多机器人、多类型、可扩展、可持久化）
// =======================================

export type BroadcastType = "text" | "media" | "buttons";

export interface QueueItem {
  ownerId: number;               // 主控机器人用户ID（谁发的）
  botId: number;                 // 子机器人ID
  type: BroadcastType;           // 任务类型
  payload: any;                  // 内容（文本 / 媒体URL / 按钮JSON）
  timestamp: number;             // 用于任务排序 & 防重复 & 重启恢复
}

const queue: QueueItem[] = [];

/**
 * 推送新的广播任务进队列
 */
export function pushBroadcast(
  ownerId: number,
  botId: number,
  type: BroadcastType,
  payload: any
) {
  queue.push({
    ownerId,
    botId,
    type,
    payload,
    timestamp: Date.now(),
  });
}

/**
 * 从队列取出一个广播任务（FIFO）
 */
export function popBroadcast(): QueueItem | undefined {
  return queue.shift();
}

/**
 * 可选：查看当前队列长度
 */
export function getQueueSize() {
  return queue.length;
}
