// ==================================================================
//                     plugins/wallet/records.ts
//                   钱包流水记录（可分页展示）
// ==================================================================

import { getUser } from "../../db/userdb.ts";
import { getWallet } from "../../db/walletdb.ts";
import { sendText } from "../../core/send.ts";
import { T } from "../lang/index.ts";


// 每页显示 10 条
const PAGE_SIZE = 10;


// ==================================================================
//                     展示钱包记录（入口）
// ==================================================================
export async function showWalletRecords(uid: number, page = 1) {
  const user = await getUser(uid);
  const wallet = await getWallet(uid);
  const lang = user.lang || "en";

  const records = wallet.records || [];
  const total = records.length;

  if (total === 0) {
    await sendText(uid, T(lang, "wallet_no_records"));
    return;
  }

  // ========================
  //       分页计算
  // ========================
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageRecords = records.slice(start, end);

  // 总页数
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const lines: string[] = [];
  lines.push(`📜 <b>${T(lang, "wallet_records")}</b>`);
  lines.push(`(${page} / ${totalPages})`);
  lines.push("");

  // ========================
  //         逐条渲染
  // ========================
  for (const r of pageRecords) {
    const timeStr = new Date(r.time).toLocaleString();

    if (r.type === "deposit") {
      lines.push(`🟢 <b>${T(lang, "wallet_record_deposit")}</b>`);
      lines.push(`+${r.amount} USDT`);
      lines.push(`TXID: <code>${r.txid}</code>`);
      lines.push(`${timeStr}`);
    }

    if (r.type === "withdraw") {
      const statusIcon =
        r.status === "pending" ? "⏳" :
        r.status === "success" ? "✅" :
        "❌";

      lines.push(`${statusIcon} <b>${T(lang, "wallet_record_withdraw")}</b>`);
      lines.push(`-${r.amount} USDT`);
      lines.push(`地址: <code>${r.address}</code>`);
      lines.push(`状态: <b>${r.status}</b>`);
      lines.push(`${timeStr}`);
    }

    if (r.type === "income") {
      lines.push(`🟡 <b>${T(lang, "wallet_record_income")}</b>`);
      lines.push(`+${r.amount} USDT`);
      lines.push(`来源: 推广奖励`);
      lines.push(`${timeStr}`);
    }

    if (r.type === "vip") {
      lines.push(`💎 <b>${T(lang, "wallet_record_vip")}</b>`);
      lines.push(`套餐: ${r.plan}`);
      lines.push(`-${r.amount} USDT`);
      lines.push(`${timeStr}`);
    }

    lines.push("————");
  }

  // ========================
  //       分页按钮
  // ========================
  const keyboard: any = { inline_keyboard: [] };

  const row: any[] = [];

  if (page > 1) {
    row.push({
      text: "⬅️ Prev",
      callback_data: `wallet_records_page_${page - 1}`,
    });
  }

  if (page < totalPages) {
    row.push({
      text: "Next ➡️",
      callback_data: `wallet_records_page_${page + 1}`,
    });
  }

  if (row.length > 0) keyboard.inline_keyboard.push(row);

  keyboard.inline_keyboard.push([
    { text: T(lang, "back"), callback_data: "back_main" },
  ]);

  // ========================
  //     发送内容
  // ========================
  await sendText(uid, lines.join("\n"), keyboard);
}

