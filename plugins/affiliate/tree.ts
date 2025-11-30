// plugins/affiliate/tree.ts
import { getAllUsers } from "../../db/userdb.ts";

export async function buildTree(uid: number, level = 1): Promise<string> {
    const users = await getAllUsers();
    let out = "";

    for (const u of users) {
        if (u.ref_by === uid) {
            out += " ".repeat(level * 2) + `├ 👤 ${u.id}\n`;
            out += await buildTree(u.id, level + 1);
        }
    }
    return out || "（暂无下级）";
}

