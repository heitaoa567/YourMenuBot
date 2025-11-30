// ========================================
//            Wallet - 充值模块
//       /plugins/wallet/deposit.ts
// ========================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { addBalance } from "./balance.ts";
import { addLedgerRecord } from "./ledger.ts";
import { runAffiliateReward } from "../affiliate/reward.ts";

// 链上验证函数（你可以换成真实API）
async function verifyTxidOnChain(txid: string) {
  // 未来你可以接:
  // - tronscan API
  // - oklink
  // - 你自己的节点
  console.log("[CHECK TXID] Checking:", txid);

  // 测试环境：全部当做成功 10 USDT
  return {
    valid: true,
    amount: 10, // 假设交易金额 10U
    from: "TEST_ADDRESS",
  };
}

// 处理 pay TxID
export async function addDepositRequest(chatId: number, txid: string) {

  const user = await getUser(chatId);

  // 防止重复提交
  if (!user.used_txids) user.used_txids = [];
  if (user.used_txids.includes(txid)) {
    return "❌ 该 TxID 已经使用过，请勿重复提交。";
  }

  // 验证链上交易
  const result = await verifyTxidOnChain(txid);

  if (!result.valid) {
    return "❌ 无效的 TxID，请检查后重新提交。";
  }

  const amount = result.amount;

  // 入账余额
  await addBalance(chatId, amount);

  // 记录 TxID
  user.used_txids.push(txid);
  await saveUser(chatId, user);

  // 账单记录
  await addLedgerRecord(chatId, {
    type: "deposit",
    amount,
    detail: `USDT 充值成功 (TxID: ${txid})`,
    timestamp: Date.now(),
  });

  // 多级返佣（最高 40%）
  await runAffiliateReward(chatId, amount);

  return `💰 *充值成功*\n\n到账金额：*${amount} USDT*\nTxID：\`${txid}\``;
}

