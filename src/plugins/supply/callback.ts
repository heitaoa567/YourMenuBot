// ======================================================================
//                     plugins/supply/callback.ts
//                      供需按钮回调处理
// ======================================================================

import { startPublish } from "./publish.ts";
import { showSupplyList } from "./view.ts";

export async function onSupplyCallback(uid: number, data: string) {
  if (data === "supply_publish") {
    await startPublish(uid);
    return true;
  }

  if (data === "supply_list") {
    await showSupplyList(uid);
    return true;
  }

  return false;
}

