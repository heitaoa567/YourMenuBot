// ======================================================================
// plugins/subbot/listener/click.ts
// 子机器人按钮点击记录 & 行为处理（完全适配你的 subbotdb.ts）
// ======================================================================

import { getSubBot, addClick } from "../../../db/subbotdb.ts";

/**
 * 处理来自子机器人的按钮点击事件
 * @param ownerId 主机器人用户ID（谁绑定的子机器人）
 * @param botId   子机器人 ID
 * @param userId  子机器人粉丝ID
 * @param data    点击的 callback_data
 */
export async function handleSubBotClick(
  ownerId: number,
  botId: number,
  userId: number,
  data: string
) {
  // 读取子机器人信息
  const bot = await getSubBot(ownerId);

  if (!bot || bot.bot_id !== botId) {
    console.log("❌ 未找到子机器人 → ownerId:", ownerId, "botId:", botId);
    return;
  }

  // 记录点击统计
  await addClick(ownerId);

  // 标准输出
  console.log(
    `📌 子机器人按钮点击 → owner:${ownerId} botId:${botId} user:${userId} data:${data}`
  );

  // ====================================================================
  // 可扩展：根据 data 执行动作
  // ====================================================================
  switch (data) {
    case "menu":
      console.log("打开菜单");
      break;

    case "help":
      console.log("打开帮助");
      break;

    default:
      console.log("收到未知按钮：", data);
      break;
  }
}
