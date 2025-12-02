// ==================================================================
//                  plugins/subbot/menus/index.ts
//                  子机器人主菜单（绑定后可用）
// ==================================================================

import { getUser } from "../../../db/userdb.ts";
import { sendText } from "../../../core/send.ts";
import { T } from "../../lang/index.ts";


// ==================================================================
//                显示子机器人主菜单
// ==================================================================
export async function showSubBotMenu(uid: number) {
  const user = await getUser(uid);
  const lang = user.lang || "en";

  const text = T(lang, "subbot_menu_title");

  const keyboard = {
    inline_keyboard: [
      [{ text: T(lang, "subbot_buttons"), callback_data: "subbot_buttons" }],
      [{ text: T(lang, "subbot_broadcast"), callback_data: "subbot_broadcast" }],
      [{ text: T(lang, "subbot_stats"), callback_data: "subbot_stats" }],
      [{ text: T(lang, "back"), callback_data: "back_main" }]
    ]
  };

  await sendText(uid, text, keyboard);
}
