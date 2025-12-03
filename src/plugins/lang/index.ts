// ======================================================================
//                    plugins/lang/index.ts
//  多语言系统入口：自动识别语言 / 切换语言 / 提供 T() 文案函数
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { sendText } from "../../core/send.ts";
import { LANG } from "./languages.ts";  // 15国文本
import type { Message, CallbackQuery } from "../../types.ts";

// 支持的语言代码（需要与 languages.ts 的 key 一致）
export const SUPPORTED_LANGS = [
  "en", "zh", "jp", "kr", "th", "vi", "id", "ms",
  "es", "pt", "fr", "ar", "ru", "hi", "tr",
];

// ======================================================================
//  自动加载语言：用户第一次使用 → 设置为英文 en（方便全球用户）
// ======================================================================
export async function loadLanguage(update: any) {
  if (!update.message) return;
  const uid = update.message.chat.id;
  const user = await getUser(uid);

  if (!user.lang) {
    user.lang = "en";
    await saveUser(uid, user);
  }
}

// ======================================================================
//  T() 翻译函数：任何模块都可以通过 T(lang, key) 获取对应语言
// ======================================================================
export function T(lang: string, key: string, vars: Record<string, any> = {}) {
  let text = LANG[key]?.[lang] || LANG[key]?.["en"] || key;

  for (const k in vars) {
    text = text.replace(`{{${k}}}`, vars[k]);
  }
  return text;
}

// ======================================================================
//  (A) 语言切换菜单：通过 /lang 或 “language” 触发
// ======================================================================
export async function onMessage(uid: number, text: string, msg: Message) {
  if (text.toLowerCase() !== "/lang" && text.toLowerCase() !== "language") {
    return false;
  }

  const keyboard = {
    inline_keyboard: SUPPORTED_LANGS.map((code) => [
      { text: code.toUpperCase(), callback_data: `set_lang_${code}` },
    ]),
  };

  await sendText(uid, "🌍 Select your language:", keyboard);
  return true;
}

// ======================================================================
//  (B) 回调：用户点击语言按钮 → 更新语言
// ======================================================================
export async function onCallback(uid: number, data: string, cq: CallbackQuery) {
  if (!data.startsWith("set_lang_")) return false;

  const lang = data.replace("set_lang_", "");

  if (!SUPPORTED_LANGS.includes(lang)) return false;

  const user = await getUser(uid);
  user.lang = lang;
  await saveUser(uid, user);

  await sendText(uid, `🌍 Language switched to <b>${lang.toUpperCase()}</b>`);
  return true;
}
