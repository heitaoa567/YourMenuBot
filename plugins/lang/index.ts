// ======================================================================
//                        plugins/lang/index.ts
//      多语言引擎（自动检测 / 切换语言 / 读取语言包）
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { sendText } from "../../core/send.ts";
import { LANG } from "./languages.ts";   // 你早上生成的 15 国翻译内容
import type { Message, CallbackQuery } from "../../types.ts";


// 支持的语言列表（必须与 languages.ts 的 key 对应）
export const SUPPORTED_LANGS = [
  "en", "zh", "jp", "kr", "th", "vi", "id", "ms",
  "es", "pt", "fr", "ar", "ru", "hi", "tr"
];


// ======================================================================
//               自动加载语言（用户没语言就默认英文）
// ======================================================================
export async function loadLanguage(update: any) {
  if (!update.message) return;

  const uid = update.message.chat.id;
  const user = await getUser(uid);

  if (!user.lang) {
    // 默认英文（让用户知道有语言切换）
    user.lang = "en";
    await saveUser(uid, user);
  }
}


// ======================================================================
//                获取语言文案（全局调用）
// ======================================================================
export function T(lang: string, key: string, vars: Record<string, any> = {}) {
  let text = LANG[key]?.[lang] || LANG[key]?.["en"] || key;

  // 替换 {{变量}}
  for (const k in vars) {
    text = text.replace(`{{${k}}}`, vars[k]);
  }
  return text;
}


// ======================================================================
//                插件入口：onMessage
// ======================================================================
export async function onMessage(uid: number, text: string, msg: Message) {
  const user = await getUser(uid);

  // 用户输入 "language" 或 "/lang" → 显示语言菜单
  if (text.toLowerCase() === "/lang" || text.toLowerCase() === "language") {
    const menu = {
      inline_keyboard: SUPPORTED_LANGS.map(code => [
        { text: code.toUpperCase(), callback_data: `set_lang_${code}` }
      ])
    };

    await sendText(uid, "🌍 Select your language:", menu);
    return true;
  }

  return false; // 不处理其他消息
}


// ======================================================================
//                插件入口：onCallback
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

