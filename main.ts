// main.ts
// =============================================
// YourMenuBot 入口文件（主机器人）
// AI 助手 / VIP / 推广 / 多语言 / 子机器人
// =============================================

import { LANG } from "./languages.ts";
import { mainMenu, languageMenu, vipBuyMenu, referralMenu, subBotMenu } from "./keyboards/keyboards.ts";
import { handleReferral, recordReferral, recordReferralClick } from "./libs/referral.ts";
import { getPaymentInfo, handlePayment, buyVIP } from "./libs/payment.ts";
import { getUser, saveUser } from "./db/userdb.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");
const TG = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ========================
// 通用发送函数
// ========================
async function send(chatId: number, text: string, keyboard?: any) {
  const body: any = {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
  };
  if (keyboard) body.reply_markup = keyboard;

  await fetch(`${TG}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ========================
// Webhook 主入口
// ========================
Deno.serve(async (req) => {
  const update = await req.json().catch(() => null);
  if (!update) return new Response("OK");

  // ========================
  // 回调按钮处理
  // ========================
  if (update.callback_query) {
    const cq = update.callback_query;
    const chatId = cq.message.chat.id;
    const user = getUser(chatId);
    const L = LANG[user.lang || "en"];

    const data = cq.data;

    // 返回主菜单
    if (data === "menu" || data === "back") {
      await send(chatId, L.menu, mainMenu(user));
      return new Response("OK");
    }

    // =======================
    // 语言切换菜单
    // =======================
    if (data === "lang_menu") {
      await send(chatId, "🌐 Select language", languageMenu());
      return new Response("OK");
    }

    if (data.startsWith("lang_")) {
      user.lang = data.replace("lang_", "");
      saveUser(chatId, user);
      const L2 = LANG[user.lang];
      await send(chatId, L2.lang_switched, mainMenu(user));
      return new Response("OK");
    }

    // =======================
    // AI 助手
    // =======================
    if (data === "ai") {
      await send(chatId, L.ai_intro, mainMenu(user));
      return new Response("OK");
    }

    // =======================
    // VIP 面板
    // =======================
    if (data === "vip") {
      const now = Math.floor(Date.now() / 1000);

      let text = L.vip_normal;
      if (user.vip_until && user.vip_until > now) {
        text = `${L.vip_active} *${new Date(user.vip_until * 1000).toLocaleString()}*`;
      }

      text += `\n\n${L.vip_buy}`;

      await send(chatId, text, vipBuyMenu(user));
      return new Response("OK");
    }

    // 选择 VIP 套餐
    if (data.startsWith("vip_")) {
      const type = data.replace("vip_", "");
      const msg = buyVIP(chatId, type);
      await send(chatId, msg, mainMenu(user));
      return new Response("OK");
    }

    // =======================
    // 推广中心
    // =======================
    if (data === "ref") {
      const text = handleReferral(chatId);
      await send(chatId, text, referralMenu(user));
      return new Response("OK");
    }

    // =======================
    // 子机器人入口
    // =======================
    if (data === "subbot") {
      await send(chatId, "🤖 子机器人管理中心", subBotMenu(user));
      return new Response("OK");
    }

    if (data === "bind_subbot") {
      await send(chatId, "请发送要绑定的 Telegram Bot Token：\n\n示例：\n123456:ABC-123xyz_token");
      user.step = "await_subbot_token";
      saveUser(chatId, user);
      return new Response("OK");
    }

    return new Response("OK");
  }

  // ==========================
  // 普通消息处理
  // ==========================
  if (update.message) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const text = msg.text || "";

    const user = getUser(chatId);
    if (!user.lang) user.lang = "en";

    const L = LANG[user.lang];

    // ==========================
    // /start 入口（带推广参数 + 功能介绍）
    // ==========================
    if (text.startsWith("/start")) {
      const args = text.split(" ");
      const ref = args[1];

      // 记录推广点击
      if (ref && Number(ref)) {
        recordReferralClick(Number(ref));
        recordReferral(Number(ref));
      }

      const intro = `
🤖 *${L.bot_name}*

${L.bot_intro}

${L.feature_title}
${L.features}

${L.choose_action}
      `;

      await send(chatId, intro, mainMenu(user));
      return new Response("OK");
    }

    // ==========================
    // 子机器人绑定 Token
    // ==========================
    if (user.step === "await_subbot_token") {
      user.sub_token = text;
      user.step = null;
      saveUser(chatId, user);

      await send(chatId, "🎉 子机器人绑定成功！", mainMenu(user));
      return new Response("OK");
    }

    // ==========================
    // 处理支付回执
    // ==========================
    if (text.startsWith("pay")) {
      const txid = text.split(" ")[1];
      const msg = await handlePayment(chatId, txid);
      await send(chatId, msg, mainMenu(user));
      return new Response("OK");
    }

    // ==========================
    // 默认返回主菜单
    // ==========================
    await send(chatId, L.menu, mainMenu(user));
    return new Response("OK");
  }

  return new Response("OK");
});
