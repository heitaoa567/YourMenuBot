// =======================================================
// plugins/broadcast/worker.ts
// 🔥 广播发送器（自动循环处理广播队列）
// =======================================================

import { sendMsg } from "../../core/send";
import { Users } from "../../userdb";
import { SubBotDB } from "../../subbotdb";

// 发送间隔（避免 Telegram 限速）
const DELAY = 50; // 50 毫秒 = 每秒 20 个用户

console.log("📣 广播 worker 已启动...");

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processBroadcastQueue() {

  while (true) {

    const queue = SubBotDB.getSystemSettings().broadcastQueue || [];

    if (queue.length === 0) {
      // 无任务 → 每 3 秒检查一次
      await sleep(3000);
      continue;
    }

    // 取第一个任务
    const job = queue[0];

    console.log("📢 正在处理广播任务：", job);

    const allUsers = Users.getAllUsers(); // 你 userdb 里应该有此方法

    for (const user of allUsers) {
      const chatId = user.id;

      try {

        if (job.type === "text") {
          await sendMsg({ chat: { id: chatId } }, job.content);
        }

        else if (job.type === "photo") {
          await sendMsg(
            { chat: { id: chatId } },
            job.caption || "",
            { photo: job.fileId }
          );
        }

        else if (job.type === "video") {
          await sendMsg(
            { chat: { id: chatId } },
            job.caption || "",
            { video: job.fileId }
          );
        }

        else if (job.type === "button") {
          await sendMsg(
            { chat: { id: chatId } },
            job.content,
            { reply_markup: { inline_keyboard: job.buttons } }
          );
        }

      } catch (err) {
        console.log(`❌ 广播失败 → user ${chatId}:`, err);
      }

      await sleep(DELAY);
    }

    console.log("🎉 广播任务完成 → 正在删除任务");

    // 删除第一个任务
    queue.shift();
    SubBotDB.setSystemSetting("broadcastQueue", queue);

    await sleep(1000);
  }
}

// 启动 worker 循环
processBroadcastQueue();
