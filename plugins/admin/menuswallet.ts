// ==========================================
// plugins/admin/menus/wallet.ts
// 钱包系统后台菜单
// ==========================================

import { sendMsg } from "../../../core/send";
import { SubBotDB } from "../../../subbotdb";

export async function showAdminWalletMenu(ctx: any) {

  const wallet = SubBotDB.getWalletSettings();

  const text = `💰 *钱包系统后台*

当前设置：
• 最低充值金额：${wallet.min_deposit} USDT
• 最低提现金额：${wallet.min_withdraw} USDT
• 充值手续费：${wallet.deposit_fee}%
• 提现手续费：${wallet.withdraw_fee}%

请选择你要调整的功能👇`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "✏️ 修改最低充值", callback_data: "admin_wallet_edit_mindep" }
      ],
      [
        { text: "✏️ 修改最低提现", callback_data: "admin_wallet_edit_minwd" }
      ],
      [
        { text: "💰 修改充值手续费", callback_data: "admin_wallet_fee_dep" }
      ],
      [
        { text: "💸 修改提现手续费", callback_data: "admin_wallet_fee_wd" }
      ],
      [
        { text: "🔙 返回后台", callback_data: "admin_main" }
      ]
    ]
  };

  await sendMsg(ctx, text, {
    parse_mode: "Markdown",
    reply_markup: keyboard
  });
}
