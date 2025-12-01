// =====================================================
//                 keyboards/language.ts
//         YourMenuBot 多语言选择（15国语言）
// =====================================================

export function languageKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "🇨🇳 简体中文", callback_data: "set_lang_zh" },
        { text: "🇺🇸 English", callback_data: "set_lang_en" },
      ],
      [
        { text: "🇯🇵 日本語", callback_data: "set_lang_jp" },
        { text: "🇰🇷 한국어", callback_data: "set_lang_kr" },
      ],
      [
        { text: "🇹🇭 ไทย", callback_data: "set_lang_th" },
        { text: "🇻🇳 Tiếng Việt", callback_data: "set_lang_vn" },
      ],
      [
        { text: "🇮🇩 Indonesia", callback_data: "set_lang_id" },
        { text: "🇲🇾 Melayu", callback_data: "set_lang_my" },
      ],
      [
        { text: "🇸🇦 العربية", callback_data: "set_lang_ar" },
        { text: "🇷🇺 Русский", callback_data: "set_lang_ru" },
      ],
      [
        { text: "🇪🇸 Español", callback_data: "set_lang_es" },
        { text: "🇵🇹 Português", callback_data: "set_lang_pt" },
      ],
      [
        { text: "🇮🇹 Italiano", callback_data: "set_lang_it" },
        { text: "🇫🇷 Français", callback_data: "set_lang_fr" },
      ],
      [
        { text: "🇩🇪 Deutsch", callback_data: "set_lang_de" },
      ],
      [
        { text: "⬅ 返回", callback_data: "back_main" },
      ],
    ],
  };
}

