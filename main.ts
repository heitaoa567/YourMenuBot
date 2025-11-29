// ======================================================
// YourMenuBot 主控机器人（Deno Deploy）
// 完整版本：绑定子机器人 + VIP + 充值 + AI + 推广
// ======================================================

import { BOT_TOKEN } from "./config/config.ts";
import { getUser, saveUser } from "./db/kv.ts";
import { mainMenu, languageMenu, vipMenu } from "./keyboards/keyboards.ts";

import { chatWithAI } from "./libs/chatgpt.ts";
import { bindSubBot } from "./libs/subbot.ts";
import { checkPayment } from "./libs/payment.ts";
import { getReferralPanel, handleReferralStart } from "./libs/referral.ts";
import { getVipPlan, activateVIP } from "./libs/vip.ts";

import { isValidBotToken, isVIP } from "./libs/utils.ts";
import { runDailyCron } from "./cron/cron.ts";

// Telegram 请求封装
const TG = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ------------------------------------------------------
// 通用发送函数
// ------------------------------------------------------
async function send(chatId: number, text: string, keyboard?: any) {
  await fetch(`${TG}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
      reply_markup: keyboard,
    }),
  });
}

// ------------------------------------------------------
// Webhook 主入口
// ------------------------------------------------------
Deno.serve(async (req) => {
  // Cron 任务触发
  if (req.headers.get("x-deno-cron") === "true") {
    await runDailyCron();
    return new Response("CRON OK");
  }

  // 解析 update
  const update = await req.json().catch(() => null);
  if (!update) return new Response("OK");

  // ------------------------------------------------------
  // 回调按钮（callback_query）
  // ------------------------------------------------------
  if (update.callback_query) {
    const cq = update.callback_query;
    const chatId = cq.message.chat.id;
    const data = cq.data;
    const user = await getUser(chatId);

    // ==== 切换语言菜单 ====
    if (data === "lang_menu") {
      await send(chatId, "🌐 请选择语言 / Choose Language", languageMenu());
      return new Response("OK");
    }

    if (data.startsWith("lang_")) {
      user.lang = data.replace("lang_", "");
      await saveUser(user);
      await send(chatId, "✔ Language Updated / 语言切换成功！", mainMenu(user));
      return new Response("OK");
    }

    // ==== ChatGPT ====
    if (data === "chat") {
      await send(chatId, "🤖 请发送你的问题，我来回答你！");
      user.step = "chat_mode";
      await saveUser(user);
      return new Response("OK");
    }

    // ==== VIP 面板 ====
    if (data === "vip_panel") {
      await send(chatId, "💎 VIP 套餐：", vipMenu());
      return new Response("OK");
    }

    // ==== 购买 VIP ====
    if (data.startsWith("vip_")) {
      const planKey = data.replace("vip_", "");
      const plan = getVipPlan(planKey);

      if (!plan) {
        await send(chatId, "套餐不存在");
        return new Response("OK");
      }

      await send(
        chatId,
        `💰 请向 USDT 地址充值 **${plan.price} USDT**：\n\n` +
        "`" + Deno.env.get("USDT_TRC20_ADDRESS") + "`\n\n" +
        `充值完成后发送： *pay* 让我自动识别\n套餐：${planKey}`
      );

      return new Response("OK");
    }

    // ==== 推广中心 ====
    if (data === "referral") {
      const panel = await getReferralPanel(chatId, user.lang);
      await send(chatId, panel);
      return new Response("OK");
    }

    // ==== 绑定子机器人 ====
    if (data === "bind_bot") {
      await send(chatId, "请发送你的子机器人 Token：\n格式类似 `12345:ABCDE`");
      user.step = "await_bind_token";
      await saveUser(user);
      return new Response("OK");
    }

    // ==== 查看我的子机器人 ====
    if (data === "my_bots") {
      if (user.bots.length === 0) {
        await send(chatId, "你还没有绑定任何子机器人。");
      } else {
        await send(chatId, `你已绑定以下子机器人：\n${user.bots.join("\n")}`);
      }
      return new Response("OK");
    }

    return new Response("OK");
  }

  // ------------------------------------------------------
  // 普通消息 message
  // ------------------------------------------------------
  if (update.message) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const text = msg.text || "";
    const user = await getUser(chatId);

    // ==== 推广 start 参数 ====
    if (text.startsWith("/start")) {
      const payload = text.replace("/start", "").trim();
      if (payload) {
        await handleReferralStart(chatId, payload);
      }
      await send(chatId, "欢迎使用机器人菜单系统！", mainMenu(user));
      return new Response("OK");
    }

    // ==== 聊天模式 ====
    if (user.step === "chat_mode") {
      const reply = await chatWithAI(chatId, text);
      await send(chatId, reply);
      return new Response("OK");
    }

    // ==== pay 充值 ====
    if (text.startsWith("pay")) {
      const reply = await checkPayment(chatId);
      await send(chatId, reply, mainMenu(user));
      return new Response("OK");
    }

    // ==== 用户发送 Token 绑定子机器人 ====
    if (user.step === "await_bind_token") {
      if (!isValidBotToken(text)) {
        await send(chatId, "❗ Token 格式不正确，请重新发送！");
        return new Response("OK");
      }

      const result = await bindSubBot(chatId, text);
      await send(chatId, result, mainMenu(user));

      user.step = null;
      await saveUser(user);
      return new Response("OK");
    }

    // ==== 默认显示主菜单 ====
    await send(chatId, "请选择功能：", mainMenu(user));
    return new Response("OK");
  }

  return new Response("OK");
});
