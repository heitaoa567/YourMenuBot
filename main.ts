// ==========================================
//            YourMenuBot - main.ts
// ==========================================

import { LANG } from "./libs/languages.ts";
import { getUser, saveUser } from "./db/userdb.ts";
import { mainMenu, languageMenu, vipMenu } from "./keyboards/keyboards.ts";
import { aiReply } from "./libs/chatgpt.ts";
import { checkUserVIP, extendVIP } from "./libs/vip.ts";
import { handleUSDT, validateTxid } from "./libs/payment.ts";
import { recordReferralClick, handleReferralPanel } from "./libs/referral.ts";
import { startBindSubBot, saveSubBotToken } from "./libs/subbot.ts";

// ==========================================
//        获取环境变量
// ==========================================
const BOT_TOKEN = Deno.env.get("BOT_TOKEN")!;
const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY")!;
const BOT_USERNAME = Deno.env.get("BOT_USERNAME") || "YourMenuBot";
const USDT_ADDRESS = Deno.env.get("USDT_ADDRESS") || "TEJTdBXKK49CuSnoh2GnCgmXr6sbCDXJHh";

const TG = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ==========================================
//             统一发送函数
// ==========================================
async function send(chatId: number, text: string, keyboard?: any) {
  const body: any = {
    chat_id: chatId,
    text,
    parse_mode: "Markdown"
  };
  if (keyboard) body.reply_markup = keyboard;

  await fetch(`${TG}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

// ==========================================
//             Webhook 主入口
// ==========================================
Deno.serve(async (req) => {
  const update = await req.json().catch(() => null);
  if (!update) return new Response("OK");

  // ============= 回调按钮 =============
  if (update.callback_query) {
    const cq = update.callback_query;
    const chatId = cq.message.chat.id;

    const user = await getUser(chatId);
    const lang = user.lang || "zh";
    const L = LANG[lang];

    const data = cq.data;

    // 切换语言
    if (data === "change_lang") {
      await send(chatId, L.choose_lang, languageMenu());
      return new Response("OK");
    }

    if (data === "set_lang_zh") {
      user.lang = "zh";
      await saveUser(chatId, user);
      await send(chatId, L.lang_switched, mainMenu("zh"));
      return new Response("OK");
    }

    if (data === "set_lang_en") {
      user.lang = "en";
      await saveUser(chatId, user);
      await send(chatId, "Language switched ✓", mainMenu("en"));
      return new Response("OK");
    }

    // VIP 套餐页面
    if (data === "vip") {
      await send(chatId, L.vip_title, vipMenu());
      return new Response("OK");
    }

    // 选择 VIP 套餐
    if (data.startsWith("vip_")) {
      const plan = data.replace("vip_", "");
      user.buy_plan = plan;
      await saveUser(chatId, user);

      await send(chatId, L.vip_pay_tip(USDT_ADDRESS), mainMenu(lang));
      return new Response("OK");
    }

    // 推广中心
    if (data === "ref") {
      const panel = await handleReferralPanel(chatId);
      await send(chatId, panel);
      return new Response("OK");
    }

    // 子机器人绑定
    if (data === "bind_subbot") {
      await startBindSubBot(chatId);
      await send(chatId, L.send_token);
      return new Response("OK");
    }

    // 返回主菜单
    if (data === "back") {
      await send(chatId, L.menu, mainMenu(lang));
      return new Response("OK");
    }

    return new Response("OK");
  }

  // ============= 普通消息 =============
  if (update.message) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const text = msg.text || "";

    let user = await getUser(chatId);
    const lang = user.lang || "zh";
    const L = LANG[lang];

    // 自动初始化
    if (!user.created_at) {
      user = {
        created_at: Date.now(),
        lang: "zh",
        ai_used_today: 0,
        isVIP: false,
        vip_until: 0,
        referrals: 0,
        referral_clicks: 0,
        referral_income: 0,
        subbots: [],
        waiting_subbot_token: false
      };
      await saveUser(chatId, user);
    }

    // /start + 推广参数
    if (text.startsWith("/start")) {
      const arr = text.split(" ");
      if (arr.length > 1) {
        const ref = Number(arr[1]);
        if (ref && ref !== chatId) recordReferralClick(ref);
      }

      await send(chatId, L.welcome, mainMenu(lang));
      return new Response("OK");
    }

    // 正在等待子机器人 Token
    if (user.waiting_subbot_token) {
      const result = await saveSubBotToken(chatId, text);
      await send(chatId, result, mainMenu(lang));
      return new Response("OK");
    }

    // USDT 充值 → pay txid
    if (text.startsWith("pay")) {
      const parts = text.split(" ");
      if (parts.length !== 2) {
        await send(chatId, L.pay_format_error);
        return new Response("OK");
      }

      const txid = parts[1];
      const check = await validateTxid(txid);

      if (!check) {
        await send(chatId, L.tx_invalid);
        return new Response("OK");
      }

      const extend = await handleUSDT(chatId);
      await send(chatId, extend, mainMenu(lang));
      return new Response("OK");
    }

    // AI 问答
    if (text.startsWith("AI") || text.startsWith("问")) {
      const isVIP = checkUserVIP(user);

      // 普通用户限时
      if (!isVIP) {
        if (!user.ai_start) user.ai_start = Date.now();
        const used = Date.now() - user.ai_start;

        if (used > 30 * 60 * 1000) {
          await send(chatId, L.ai_limit);
          return new Response("OK");
        }
      }

      const question = text.replace("AI", "").replace("问", "").trim();
      const answer = await aiReply(question);
      await send(chatId, answer, mainMenu(lang));
      return new Response("OK");
    }

    // 默认返回菜单
    await send(chatId, L.menu, mainMenu(lang));
    return new Response("OK");
  }

  return new Response("OK");
});
