// =======================================
// plugins/subbot/broadcast/queue.ts
// 简单的内存广播队列（你未来可以换Redis）
// =======================================

interface QueueItem {
  botId: number;
  type: "text" | "media" | "buttons";
  payload: any;
}

const queue: QueueItem[] = [];

export function pushBroadcast(botId: number, type: string, payload: any) {
  queue.push({ botId, type: type as any, payload });
}

export function popBroadcast(): QueueItem | undefined {
  return queue.shift();
}

