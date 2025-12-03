// =====================================================
// libs/typecheck.ts
// 常用类型判断（全局都能用）
// =====================================================

export const is = {
  string: (v: any) => typeof v === "string",
  number: (v: any) => typeof v === "number",
  boolean: (v: any) => typeof v === "boolean",
  object: (v: any) =>
    typeof v === "object" && v !== null && !Array.isArray(v),
  array: (v: any) => Array.isArray(v),
  empty: (v: any) =>
    v === null ||
    v === undefined ||
    (typeof v === "string" && v.trim() === "") ||
    (Array.isArray(v) && v.length === 0)
};

