// ===================================================================
//                     plugins/subbot/main.ts
//      每个子机器人独立的 Webhook 服务（超级重要）
// ===================================================================

import { getSubBot } from "../../db/subbotdb.ts";
import { handleSubBotUpdate } from "./handler.ts";
import { sendText } from "../../core/send.ts";


// ===================================================================
//        创建子机器人的 webhook：owner 绑定 token 时调用
// ===================================================================
export async function setupSubBotWebhook(owner_id: number, token: string) {
  const webhook = `${Deno.env.get("HOST_URL")}/subbot/${owner_id}`;

  const url = `https://api.telegram.org/bot${token}/setWebhook`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: webhook })
  });

  return res.json();
}



// ===================================================================
//        子机器人 Webhook 主入口 -（独立接收 Telegram 回调）
// ===================================================================

export async function startSubBotServer() {
  // ⚠ 此处 URL 是子机器人专用路径：
  //    https://你的域名/subbot/{owner_id}
  Deno.serve(async (req) => {

    const url = new URL(req.url);
    const path = url.pathname;

    // 必须匹配 /subbot/OWNERID
    if (!path.startsWith("/subbot/")) {
      return new Response("SubBot OK");
    }

    const owner_id = Number(path.replace("/subbot/", ""));
    if (!owner_id) return new Response("Invalid owner id");

    // 读取 update
    const update = await req.json().catch(() => null);
    if (!update) return new Response("OK");

    const sub = await getSubBot(owner_id);
    if (!sub) {
      return new Response("No subbot found");
    }

    // 所有子机器人事件 → 交给 handler
    await handleSubBotUpdate(owner_id, update);

    return new Response("OK");
  });
}



// ===================================================================
//        在主程序 main.ts 里调用本函数即可启动子机器人服务
// ===================================================================

export function initSubBots() {
  console.log("🚀 子机器人 Webhook 服务已启动");
  startSubBotServer();
}

