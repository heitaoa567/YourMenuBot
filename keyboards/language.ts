// =====================================================
//                 keyboards/language.ts
//     YourMenuBot 多语言选择（默认 English）
// =====================================================

export function languageKeyboard(current: string = "en") {
  function btn(text: string, lang: string) {
    return {
      text: current === lang ? `${text} (Current)` : text,
      callback_data: `set_lang_${lang}`
    };
  }

  return {
    inline_keyboard: [
      [
        btn("🇨🇳 简体中文", "zh"),
        btn("🇺🇸 English", "en"),
      ],
      [
        btn("🇯🇵 日本語", "jp"),
        btn("🇰🇷 한국어", "kr"),
      ],
      [
        btn("🇹🇭 ไทย", "th"),
        btn("🇻🇳 Tiếng Việt", "vn"),
      ],
      [
        btn("🇮🇩 Indonesia", "id"),
        btn("🇲🇾 Melayu", "my"),
      ],
      [
        btn("🇸🇦 العربية", "ar"),
        btn("🇷🇺 Русский", "ru"),
      ],
      [
        btn("🇪🇸 Español", "es"),
        btn("🇵🇹 Português", "pt"),
      ],
      [
        btn("🇮🇹 Italiano", "it"),
        btn("🇫🇷 Français", "fr"),
      ],
      [
        btn("🇩🇪 Deutsch", "de"),
      ],
      [
        { text: "⬅ Back", callback_data: "back_main" },
      ],
    ],
  };
}
