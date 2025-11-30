// ===============================
//      YourMenuBot 主控机器人入口（修复完整版）
// ===============================

import { LANG } from "./libs/languages.ts";
import { mainMenu, languageMenu, vipMenu, referralMenu } from "./keyboards/keyboards.ts";
import { recordReferralClick, getReferralInfo } from "./libs/referral.ts";
import { buyVIP, checkUserVIP } from "./libs/vip.ts";
import { aiReply } from "./libs/chatgpt.ts";
import { getUser, saveUser } from "./db/userdb.ts";
import { checkPayment } from "./libs/payment.ts";

// 获取 Token & OpenAI Key
const BOT_TOKEN = Deno.env.get("BOT_TOKEN")!;
const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY")!;
const BOT = `https://api.telegram.org/bot${BOT_TOKEN}`;

// --------------------------------
// 通用消息发送函数
// --------------------------------
async function send(chatId: number, text: string, keyboard?: any) {
  const body: any = {
    chat_id: chatId,
    text,
    parse_mode: "Markdown"
  };

  if (keyboard) body.reply_markup = keyboard;

  await fetch(`${BOT}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

// --------------------------------
// Webhook 主入口
// --------------------------------
Deno.serve(async (req) => {
  const update = await req.json().catch(() => null);
  if (!update) return new Response("OK");

  // ============ 处理回调按钮 ============
  if (update.callback_query) {
    const cq = update.callback_query;
    const chatId = cq.message.chat.id;
    const user = getUser(chatId);
    const lang = user.lang || "zh";
    const L = LANG[lang];

    const data = cq.data;

    // 切换语言菜单
    if (data === "lang") {
      await send(chatId, L.choose_lang, languageMenu());
      return new Response("OK");
    }

    if (data === "set_lang_zh") {
      user.lang = "zh";
      saveUser(user);
      await send(chatId, L.lang_switched, mainMenu("zh"));
      return new Response("OK");
    }

    if (data === "set_lang_en") {
      user.lang = "en";
      saveUser(user);
      await send(chatId, L.lang_switched, mainMenu("en"));
      return new Response("OK");
    }

    // VIP 套餐菜单
    if (data === "vip") {
      await send(chatId, L.vip_title, vipMenu());
      return new Response("OK");
    }

    // 购买 VIP 套餐（跳到充值）
    if (data.startsWith("vip_")) {
      user.buy_plan = data.replace("vip_", "");
      saveUser(user);
      await send(chatId, L.vip_pay_tip, mainMenu(lang));
      return new Response("OK");
    }

    // 推广中心
    if (data === "referral") {
      const { count, link } = getReferralInfo(chatId);
      await send(chatId, L.referral_info, referralMenu(link, count));
      return new Response("OK");
    }

    // USDT 充值开通 VIP
    if (data === "buy_vip") {
      await send(chatId, L.vip_pay_address);
      return new Response("OK");
    }

    // 返回主菜单
    if (data === "back") {
      await send(chatId, L.menu, mainMenu(lang));
      return new Response("OK");
    }

    return new Response("OK");
  }

  // ============ 普通消息处理 ============
  if (update.message) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const text = msg.text || "";
    const user = getUser(chatId);
    const lang = user.lang || "zh";
    const L = LANG[lang];

    // -----------------------
    // /start 入口（含推广参数）
    // -----------------------
    if (text.startsWith("/start")) {
      // 处理推广参数
      const arr = text.split(" ");
      if (arr.length > 1) {
        const ref = Number(arr[1]);
        if (ref && ref !== chatId) recordReferralClick(ref);
      }

      await send(chatId, L.welcome, mainMenu(lang));
      return new Response("OK");
    }

    // -----------------------
    // 用户发送 txid 检查充值
    // -----------------------
    if (text.startsWith("pay")) {
      const txid = text.split(" ")[1];

      if (!txid) {
        await send(chatId, L.pay_format_error);
        return new Response("OK");
      }

      const result = await checkPayment(chatId, txid);
      await send(chatId, result, mainMenu(lang));
      return new Response("OK");
    }

    // -----------------------
    // AI 智能助手
    // 普通用户：每天 30 分钟限制
    // VIP：无限制
    // -----------------------
    if (text.startsWith("问") || text.startsWith("？") || text.startsWith("AI")) {
      const isVIP = checkUserVIP(chatId);

      if (!isVIP) {
        const now = Date.now();
        if (!user.ai_start) user.ai_start = now;
        const used = now - user.ai_start;

        if (used > 30 * 60 * 1000) {
          await send(chatId, L.ai_limit);
          return new Response("OK");
        }
      }

      const question = text.replace("问", "").replace("AI", "").trim();
      const reply = await aiReply(question);
      await send(chatId, reply, mainMenu(lang));
      return new Response("OK");
    }

    // 默认返回主菜单
    await send(chatId, L.menu, mainMenu(lang));
    return new Response("OK");
  }

  return new Response("OK");
});
