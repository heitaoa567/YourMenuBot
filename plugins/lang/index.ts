// ======================================================================
//                    plugins/lang/index.ts
//  多语言系统入口：自动识别语言 / 切换语言 / 文案函数 T()
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { sendText, sendKeyboard } from "../../core/send.ts";
import { LANG } from "./languages.ts";

// 支持的语言代码（与 languages.ts 一致）
export const SUPPORTED_LANGS = [
  "en", "zh", "jp", "kr", "th", "vi", "id", "ms",
  "es", "pt", "fr", "ar", "ru", "hi", "tr",
];

// ======================================================================
//  T(): 文案翻译函数
// ======================================================================
export function T(lang: string, key: string, vars: Record<string, any> = {}) {
  let text = LANG[key]?.[lang] || LANG[key]?.en || key;

  for (const k in vars) {
    text = text.replace(`{{${k}}}`, vars[k]);
  }
  return text;
}

// ======================================================================
//  处理 /lang 或 "language"
// ======================================================================
export async function handleMessage(ctx: any, text: string) {
  const lower = text.toLowerCase();

  if (lower !== "/lang" && lower !== "language") return false;

  const keyboard = {
    inline_keyboard: SUPPORTED_LANGS.map((code) => [
      { text: code.toUpperCase(), callback_data: `set_lang_${code}` },
    ])
  };

  await sendKeyboard(ctx, "🌍 Select your language:", keyboard);
  return true;
}

// ======================================================================
//  处理语言切换按钮
// ======================================================================
export async function handleCallback(ctx: any, data: string) {
  if (!data.startsWith("set_lang_")) return false;

  const lang = data.replace("set_lang_", "");

  if (!SUPPORTED_LANGS.includes(lang)) return false;

  const uid = ctx.from.id;
  const user = await getUser(uid);

  user.lang = lang;
  await saveUser(user);

  await sendText(ctx, `🌍 Language switched to <b>${lang.toUpperCase()}</b>`);

  return true;
}

// ======================================================================
//  欢迎消息（由 router.ts 在 /start 时调用）
// ======================================================================
export async function welcome(ctx: any) {
  const uid = ctx.from.id;
  const user = await getUser(uid);
  const lang = user.lang || "en";

  await sendText(ctx, T(lang, "welcome"));
}
