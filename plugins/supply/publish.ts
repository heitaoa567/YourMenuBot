// ======================================================================
//                 plugins/supply/publish.ts
//         发布供需：用户输入标题 + 内容 → 系统保存
// ======================================================================

import { addSupply } from "../../db/supplydb.ts";
import { sendText } from "../../core/send.ts";

export async function startPublish(uid: number) {
  await sendText(uid, "📝 请发送供需标题：");
}

export async function saveTitle(uid: number, state: any, text: string) {
  state.title = text;
  await sendText(uid, "📄 请输入供需内容：");
}

export async function saveContent(uid: number, state: any, text: string) {
  const id = await addSupply({
    uid,
    type: "supply",
    title: state.title,
    content: text,
  });

  await sendText(uid, `🎉 发布成功！供需 ID：${id}`);
}

