// ========================================================
// 子机器人绑定 & 自动生成系统
// - 验证 token 是否真实
// - 自动创建子机器人文件夹
// - 自动生成 bot.ts 文件
// - 自动设置 webhook
// - 根据 VIP 套餐限制绑定数量
// ========================================================

import { BASE_URL } from "../config/config.ts";
import { getUser, saveUser, saveSubBotToken } from "../db/kv.ts";
import { isValidBotToken } from "./utils.ts";
import { canBindMoreBots } from "./vip.ts";

// Telegram API 请求函数
async function callTelegram(botToken: string, method: string, data: any) {
  return await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// --------------------------------------------
// 验证 Token 是否真实
// --------------------------------------------
export async function verifyBotToken(token: string) {
  const res = await callTelegram(token, "getMe", {});
  const json = await res.json();
  return json.ok ? json.result : null;
}

// --------------------------------------------
// 自动生成子机器人 bot.ts 文件内容
//（这是一个最简子机器人模板）
// --------------------------------------------
function generateBotFile(token: string, ownerId: number) {
  return `
// 自动生成的子机器人
const TOKEN = "${token}";
const TG = "https://api.telegram.org/bot" + TOKEN;

Deno.serve(async (req) => {
  const update = await req.json().catch(() => null);
  if (!update) return new Response("OK");

  const text = update.message?.text ?? "";
  const chatId = update.message?.chat?.id;

  if (text === "/start") {
    await fetch(TG + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "这是子机器人，已成功绑定主控机器人！\\n机器人拥有者：" + ${ownerId}
      }),
    });
  }

  return new Response("OK");
});
`;
}

// --------------------------------------------
// 绑定子机器人：主流程
// --------------------------------------------
export async function bindSubBot(userId: number, token: string): Promise<string> {
  const user = await getUser(userId);

  // 1. Token 格式校验
  if (!isValidBotToken(token)) {
    return "❗ Token 格式无效，请检查后重新发送。";
  }

  // 2. VIP 限制（是否还能绑定）
  const canBind = await canBindMoreBots(userId);
  if (!canBind) {
    return "⚠️ 你已达到可绑定机器人数量上限，请升级更高级 VIP 套餐。";
  }

  // 3. 验证 Token 真实性
  const botInfo = await verifyBotToken(token);
  if (!botInfo) {
    return "❗ 无法验证 Token，请确认该机器人已通过 @BotFather 创建且 Token 正确。";
  }

  // 4. 文件夹路径
  const folder = `subbots/user_${userId}`;
  const botFilePath = `${folder}/bot.ts`;

  // 5. 创建目录
  await Deno.mkdir(folder, { recursive: true });

  // 6. 写入子机器人入口文件
  await Deno.writeTextFile(botFilePath, generateBotFile(token, userId));

  // 7. 保存 Token（KV 数据库）
  await saveSubBotToken(userId, token);

  // 8. 保存到用户数据
  user.bots.push(token);
  await saveUser(user);

  // 9. 自动设置 webhook
  const webhookUrl = `${BASE_URL}/subbot/${userId}`;
  await callTelegram(token, "setWebhook", { url: webhookUrl });

  // 10. 返回成功提示
  return `🎉 子机器人绑定成功！\n机器人名称：${botInfo.first_name}\nWebhook 已设置：\n${webhookUrl}`;
}

