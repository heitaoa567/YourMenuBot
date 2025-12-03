// =======================================================
// plugins/admin/menus/wallet.ts
// 后台 - 钱包管理菜单（对接钱包模块）
// =======================================================

import { sendMsg } from "../../../core/send";

export async function showWalletMenu(ctx: any) {
    const text = 
`💰 *钱包系统后台*

请选择你要管理的内容：`;

    const keyboard = {
        inline_keyboard: [
            [
                { text: "💵 用户余额总览", callback_data: "admin_wallet_balance" }
            ],
            [
                { text: "📥 充值记录", callback_data: "admin_wallet_deposit" }
            ],
            [
                { text: "📤 提现记录", callback_data: "admin_wallet_withdraw" }
            ],
            [
                { text: "📑 钱包账单流水", callback_data: "admin_wallet_ledger" }
            ],
            [
                { text: "⬅️ 返回后台主菜单", callback_data: "admin_back" }
            ]
        ]
    };

    await sendMsg(ctx, text, {
        parse_mode: "Markdown",
        reply_markup: keyboard
    });
}
