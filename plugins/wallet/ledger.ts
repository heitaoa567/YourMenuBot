// ========================================
//            Wallet - 账单系统
//       /plugins/wallet/ledger.ts
// ========================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { TG } from "../../main.ts";

async function send(chatId: number, text: string, keyboard?: any) {
  await fetch(`${TG}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
      reply_markup: keyboard,
    }),
  });
}

// =============================
//   添加一条账单记录
// =============================
export async function addLedgerRecord(uid: number, record: any) {
  const user = await getUser(uid);

  if (!user.ledger) user.ledger = [];

  user.ledger.push({
    type: record.type,     // deposit / withdraw / spend / reward
    amount: record.amount,
    detail: record.detail,
    timestamp: record.timestamp || Date.now(),
  });

  await saveUser(uid, user);
}

// 格式化金额符号
function formatAmount(amount: number) {
  if (amount > 0) return `+${amount}`;
  return `${amount}`;
}

// =============================
//   获取账单页面（可分页）
// =============================
export async function getLedgerPage(uid: number, page: number = 1) {
  const user = await getUser(uid);

  if (!user.ledger || user.ledger.length === 0) {
    return {
      text: "📄 *账单为空*\n你还没有任何资金记录。",
      keyboard: {
        inline_keyboard: [[{ text: "🔙 返回钱包", callback_data: "wallet" }]],
      },
    };
  }

  const SIZE = 10; // 每页 10 条记录
  const start = (page - 1) * SIZE;
  const end = start + SIZE;

  const records = user.ledger.slice().reverse().slice(start, end);

  let msg = `📄 *资金流水明细*\n（第 ${page} 页）\n\n`;

  records.forEach((r: any) => {
    const time = new Date(r.timestamp).toLocaleString();
    msg += `• ${formatAmount(r.amount)} USDT — ${r.detail}\n🕒 ${time}\n\n`;
  });

  // 分页按钮
  const keyboard = { inline_keyboard: [] };

  const buttons = [];
  if (page > 1) buttons.push({ text: "⬅️ 上一页", callback_data: `ledger_${page - 1}` });
  if (end < user.ledger.length) buttons.push({ text: "➡️ 下一页", callback_data: `ledger_${page + 1}` });

  if (buttons.length > 0) keyboard.inline_keyboard.push(buttons);

  // 返回钱包按钮
  keyboard.inline_keyboard.push([{ text: "🔙 返回钱包", callback_data: "wallet" }]);

  return { text: msg, keyboard };
}

// =============================
//   处理翻页 Callback
// =============================
export async function onLedgerCallback(chatId: number, data: string) {
  if (!data.startsWith("ledger_")) return "ignored";

  const page = Number(data.replace("ledger_", ""));

  const pageData = await getLedgerPage(chatId, page);
  await send(chatId, pageData.text, pageData.keyboard);

  return "handled";
}

