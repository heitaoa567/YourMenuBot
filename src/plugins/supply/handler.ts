// ======================================================================
//                     plugins/supply/handler.ts
//                  供需发布文本输入处理（多步骤）
// ======================================================================

import { getUser, saveUser } from "../../db/userdb.ts";
import { saveTitle, saveContent } from "./publish.ts";

export async function onSupplyMessage(uid: number, text: string) {
  const user = await getUser(uid);

  if (!user.supply_state) user.supply_state = { step: 0 };

  const state = user.supply_state;

  // 未开始发布过程
  if (state.step === 0) return false;

  // Step 1：标题
  if (state.step === 1) {
    await saveTitle(uid, state, text);
    state.step = 2;
    await saveUser(uid, user);
    return true;
  }

  // Step 2：内容
  if (state.step === 2) {
    await saveContent(uid, state, text);
    user.supply_state = { step: 0 }; //结束流程
    await saveUser(uid, user);
    return true;
  }

  return false;
}

