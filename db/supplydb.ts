// ======================================
//               supplydb.ts
//     供需市场数据库（发布 / 浏览 / 置顶）
// ======================================

export interface SupplyPost {
  id: string;             // 帖子 ID
  chat_id: number;        // 发布者
  content: string;        // 内容
  created_at: number;     // 发布时间

  // 浏览统计
  views: number;          

  // 置顶
  is_top: boolean;        
  top_until: number;      

  // 推广分佣
  promote_id?: number;     // 推广人（用于 40% 返利）
}

const kv = await Deno.openKv();

// =========================
// 工具：生成供需帖 ID
// =========================
function genPostId() {
  return `supply_${Date.now()}_${Math.floor(Math.random() * 99999)}`;
}

// =========================
// 创建供需帖子
// =========================
export async function createSupply(chatId: number, content: string, promote_id?: number) {
  const post: SupplyPost = {
    id: genPostId(),
    chat_id: chatId,
    content,
    created_at: Date.now(),

    views: 0,

    is_top: false,
    top_until: 0,

    promote_id,
  };

  await kv.set(["supply", post.id], post);
  return post;
}

// =========================
// 获取单个帖子
// =========================
export async function getSupply(id: string): Promise<SupplyPost | null> {
  const res = await kv.get<SupplyPost>(["supply", id]);
  return res.value || null;
}

// =========================
// 增加浏览量
// =========================
export async function addView(id: string) {
  const post = await getSupply(id);
  if (!post) return;

  post.views++;
  await kv.set(["supply", id], post);
}

// =========================
// 查询全部帖子（排序自动处理）
// =========================
export async function listSupply(): Promise<SupplyPost[]> {
  const list: SupplyPost[] = [];

  for await (const entry of kv.list<SupplyPost>({ prefix: ["supply"] })) {
    if (entry.value) list.push(entry.value);
  }

  const now = Date.now();

  // 排序逻辑：置顶（未过期） > 时间
  return list.sort((a, b) => {
    const topA = a.is_top && a.top_until > now ? 1 : 0;
    const topB = b.is_top && b.top_until > now ? 1 : 0;

    if (topA !== topB) return topB - topA;

    return b.created_at - a.created_at;
  });
}

// =========================
// 删除帖子
// =========================
export async function deleteSupply(id: string) {
  await kv.delete(["supply", id]);
}

// =========================
// 置顶帖子
// =========================
export async function topSupply(id: string, days = 1) {
  const post = await getSupply(id);
  if (!post) return;

  const duration = days * 24 * 60 * 60 * 1000;

  post.is_top = true;
  post.top_until = Date.now() + duration;

  await kv.set(["supply", id], post);
}

// =========================
// 取消置顶
// =========================
export async function cancelTop(id: string) {
  const post = await getSupply(id);
  if (!post) return;

  post.is_top = false;
  post.top_until = 0;

  await kv.set(["supply", id], post);
}

// =========================
// 清理过期置顶（后台用）
// =========================
export async function cleanExpiredTops() {
  const now = Date.now();

  for await (const entry of kv.list<SupplyPost>({ prefix: ["supply"] })) {
    const p = entry.value;
    if (p && p.is_top && p.top_until < now) {
      p.is_top = false;
      p.top_until = 0;
      await kv.set(["supply", p.id], p);
    }
  }
}

