// plugins/vip/perms.ts
export function isVIP(user: any) {
    return user.vip_until && user.vip_until > Date.now();
}

export function addVIPDays(user: any, days: number) {
    const now = Date.now();
    const base = user.vip_until && user.vip_until > now ? user.vip_until : now;
    user.vip_until = base + days * 86400 * 1000;
}

