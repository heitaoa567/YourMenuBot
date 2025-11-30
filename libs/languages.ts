// languages.ts
// ================================
// YourMenuBot 多语言支持（6 国）
// 中文 / English / ไทย / Tiếng Việt / Bahasa Indonesia / မြန်မာစာ
// ================================

export const LANG: any = {

  // 🇨🇳 中文（简体）
  zh: {
    lang_name: "中文",
    welcome: "欢迎使用 YourMenuBot 主控机器人！",
    menu: "👇 请选择你要进行的操作：",
    lang_switched: "语言已切换为中文 🇨🇳",

    bot_name: "YourMenuBot 主控机器人",
    bot_intro: "这里是你的机器人管理中心，你可以创建自己的子机器人、管理菜单、使用 AI 助手、设置推广返利等功能。",
    feature_title: "✨ 机器人支持以下功能：",
    features: `
• 绑定并管理子机器人（类似 BotFather）
• 创建自定义按钮菜单
• 多语言系统（自动记忆用户偏好）
• AI 助手（普通用户每天 30 分钟 / VIP 无限时长）
• 推广返利系统（邀请奖励 + 收益统计）
• USDT 充值升级 VIP（周/月/季度/年）
• 自动 VIP 到期检测并提醒
• 群发广播（VIP 专属功能）
    `,
    choose_action: "👇 请选择你要进行的操作：",

    // 菜单
    btn_ai: "🤖 AI 助手",
    btn_vip: "👑 VIP 面板",
    btn_ref: "📢 推广中心",
    btn_subbot: "🤖 子机器人",
    btn_lang: "🌐 语言 Language",
    btn_back: "⬅️ 返回上一级",
    btn_menu: "🏠 返回主菜单",

    // 推广
    ref_title: "📢 推广中心",
    ref_desc: "分享你的专属邀请链接，每邀请一位用户你都能获得收益。",
    ref_link: "你的推广链接：",
    ref_stats: "📊 推广数据：",

    // VIP
    vip_title: "👑 VIP 权益",
    vip_normal: "你目前是普通用户。\n可使用 AI 助手每天 30 分钟。",
    vip_active: "你的 VIP 到期时间：",
    vip_buy: "请选择购买时长：",
    vip_week: "1 周",
    vip_month: "1 个月",
    vip_quarter: "3 个月",
    vip_year: "1 年",

    // 支付
    pay_title: "💰 充值 USDT - TRC20",
    pay_send: "请向以下地址转账：",
    pay_wait: "⚠️ 转账后请发送：\n\npay TXID",

    // AI
    ai_intro: "我是你的 AI 助手，有什么想问我的？",
  },

  // 🇺🇸 English
  en: {
    lang_name: "English",
    welcome: "Welcome to YourMenuBot Control Center!",
    menu: "👇 Choose an action:",
    lang_switched: "Language switched to English 🇺🇸",

    bot_name: "YourMenuBot Control Center",
    bot_intro: "This is your bot control center. Create sub-bots, manage menus, use AI assistant, and access referral features.",
    feature_title: "✨ Features:",
    features: `
• Bind & manage sub-bots
• Create custom button menus
• Multi-language support
• AI Assistant (30 min/day, unlimited for VIP)
• Referral reward system
• USDT payment for VIP upgrade
• Auto VIP renewal & alerts
• VIP-only broadcast system
    `,
    choose_action: "👇 Choose an action:",

    btn_ai: "🤖 AI Assistant",
    btn_vip: "👑 VIP Panel",
    btn_ref: "📢 Referral Center",
    btn_subbot: "🤖 Sub-Bot Manager",
    btn_lang: "🌐 Language",
    btn_back: "⬅️ Back",
    btn_menu: "🏠 Main Menu",

    ref_title: "📢 Referral Center",
    ref_desc: "Share your invite link and earn rewards when others join.",
    ref_link: "Your invite link:",
    ref_stats: "📊 Referral stats:",

    vip_title: "👑 VIP Benefits",
    vip_normal: "You are a normal user.\nAI Assistant: 30 minutes per day.",
    vip_active: "Your VIP expires on:",
    vip_buy: "Choose VIP duration:",
    vip_week: "1 Week",
    vip_month: "1 Month",
    vip_quarter: "3 Months",
    vip_year: "1 Year",

    pay_title: "💰 USDT - TRC20 Payment",
    pay_send: "Please send USDT to the address below:",
    pay_wait: "⚠️ After transfer, send this message:\n\npay TXID",

    ai_intro: "I'm your AI assistant. Ask me anything!",
  },

  // 🇹🇭 泰语 (Thai)
  th: {
    lang_name: "ไทย",
    welcome: "ยินดีต้อนรับสู่ YourMenuBot!",
    menu: "👇 โปรดเลือกเมนู:",
    lang_switched: "เปลี่ยนภาษาเป็นไทย 🇹🇭",

    bot_name: "YourMenuBot",
    bot_intro: "ที่นี่คือศูนย์ควบคุมบอทของคุณ สามารถสร้างบอทย่อย จัดการเมนู และใช้งานผู้ช่วย AI ได้",
    feature_title: "✨ ฟีเจอร์:",
    features: `
• สร้าง/จัดการบอทย่อย
• สร้างปุ่มเมนูเองได้
• รองรับหลายภาษา
• AI Assistant (30 นาที/วัน หรือไม่จำกัดสำหรับ VIP)
• ระบบเชิญเพื่อนรับรางวัล
• ชำระเงิน USDT เพื่ออัปเกรด VIP
• ระบบแจ้งเตือนต่ออายุ VIP
• ส่งประกาศ (เฉพาะ VIP)
    `,
    choose_action: "👇 โปรดเลือก:",

    btn_ai: "🤖 ผู้ช่วย AI",
    btn_vip: "👑 VIP",
    btn_ref: "📢 ศูนย์เชิญเพื่อน",
    btn_subbot: "🤖 บอทย่อย",
    btn_lang: "🌐 ภาษา",
    btn_back: "⬅️ กลับ",
    btn_menu: "🏠 เมนูหลัก",

    ref_title: "📢 ศูนย์เชิญเพื่อน",
    ref_desc: "แชร์ลิงก์เชิญเพื่อนเพื่อรับรางวัล",
    ref_link: "ลิงก์ของคุณ:",
    ref_stats: "📊 สถิติ:",

    vip_title: "👑 สิทธิ์ VIP",
    vip_normal: "คุณยังไม่ใช่ VIP\nAI ใช้ได้วันละ 30 นาที",
    vip_active: "VIP หมดอายุวันที่:",
    vip_buy: "เลือกแพ็กเกจ VIP:",
    vip_week: "1 สัปดาห์",
    vip_month: "1 เดือน",
    vip_quarter: "3 เดือน",
    vip_year: "1 ปี",

    pay_title: "💰 ชำระเงิน USDT",
    pay_send: "โปรดโอน USDT ไปยังที่อยู่นี้:",
    pay_wait: "⚠️ หลังจากโอน ให้ส่งข้อความนี้:\n\npay TXID",

    ai_intro: "ฉันคือผู้ช่วย AI ของคุณ ถามได้เลย!",
  },

  // 🇻🇳 越南语
  vi: {
    lang_name: "Tiếng Việt",
    welcome: "Chào mừng đến YourMenuBot!",
    menu: "👇 Chọn thao tác:",
    lang_switched: "Đã chuyển sang tiếng Việt 🇻🇳",

    bot_name: "YourMenuBot",
    bot_intro: "Trung tâm quản lý bot của bạn. Tạo bot con, quản lý menu, dùng AI và hệ thống giới thiệu.",
    feature_title: "✨ Tính năng:",
    features: `
• Tạo & quản lý bot con
• Tạo menu nút tùy chỉnh
• Hỗ trợ đa ngôn ngữ
• AI Assistant (30 phút/ngày hoặc không giới hạn cho VIP)
• Hệ thống giới thiệu nhận thưởng
• Thanh toán USDT để nâng VIP
• Tự động gia hạn VIP
• Gửi broadcast (VIP)
    `,
    choose_action: "👇 Chọn thao tác:",
    
    btn_ai: "🤖 Trợ lý AI",
    btn_vip: "👑 VIP",
    btn_ref: "📢 Giới thiệu",
    btn_subbot: "🤖 Bot con",
    btn_lang: "🌐 Ngôn ngữ",
    btn_back: "⬅️ Quay lại",
    btn_menu: "🏠 Menu chính",

    ref_title: "📢 Trung tâm giới thiệu",
    ref_desc: "Chia sẻ liên kết mời để nhận thưởng",
    ref_link: "Liên kết của bạn:",
    ref_stats: "📊 Thống kê:",

    vip_title: "👑 Quyền lợi VIP",
    vip_normal: "Bạn đang là người dùng thường.\nAI: 30 phút/ngày",
    vip_active: "VIP hết hạn:",
    vip_buy: "Chọn gói VIP:",
    vip_week: "1 Tuần",
    vip_month: "1 Tháng",
    vip_quarter: "3 Tháng",
    vip_year: "1 Năm",

    pay_title: "💰 Thanh toán USDT",
    pay_send: "Gửi USDT tới địa chỉ sau:",
    pay_wait: "⚠️ Sau khi chuyển hãy gửi:\n\npay TXID",

    ai_intro: "Tôi là trợ lý AI của bạn. Hãy hỏi tôi!",
  },

  // 🇮🇩 印尼语
  id: {
    lang_name: "Bahasa Indonesia",
    welcome: "Selamat datang di YourMenuBot!",
    menu: "👇 Pilih menu:",
    lang_switched: "Bahasa berubah ke Indonesia 🇮🇩",

    bot_name: "YourMenuBot",
    bot_intro: "Pusat kontrol bot Anda. Kelola bot turunan, menu, AI, dan referral.",
    feature_title: "✨ Fitur:",
    features: `
• Kelola sub-bot
• Buat menu tombol custom
• Banyak bahasa
• AI Assistant (30 menit/hari atau tak terbatas untuk VIP)
• Sistem referral
• Pembayaran USDT untuk VIP
• Perpanjangan VIP otomatis
• Broadcast (VIP)
    `,
    choose_action: "👇 Pilih:",

    btn_ai: "🤖 AI Assistant",
    btn_vip: "👑 VIP",
    btn_ref: "📢 Referral",
    btn_subbot: "🤖 Sub-bot",
    btn_lang: "🌐 Bahasa",
    btn_back: "⬅️ Kembali",
    btn_menu: "🏠 Menu Utama",

    ref_title: "📢 Referral",
    ref_desc: "Bagikan tautan untuk mendapatkan reward",
    ref_link: "Tautan kamu:",
    ref_stats: "📊 Statistik:",

    vip_title: "👑 VIP",
    vip_normal: "Kamu bukan VIP\nAI: 30 menit/hari",
    vip_active: "VIP berakhir:",
    vip_buy: "Pilih paket:",
    vip_week: "1 Minggu",
    vip_month: "1 Bulan",
    vip_quarter: "3 Bulan",
    vip_year: "1 Tahun",

    pay_title: "💰 Pembayaran USDT",
    pay_send: "Kirim USDT ke alamat berikut:",
    pay_wait: "⚠️ Setelah transfer, kirim:\n\npay TXID",

    ai_intro: "Saya adalah AI Assistant kamu. Tanyakan apa saja!",
  },

  // 🇲🇲 缅甸语
  mm: {
    lang_name: "မြန်မာစာ",
    welcome: "YourMenuBotထဲကို ကြိုဆိုပါတယ်!",
    menu: "👇 ရွေးပါ:",
    lang_switched: "မြန်မာစာသို့ပြောင်းပြီးပါပြီ 🇲🇲",

    bot_name: "YourMenuBot",
    bot_intro: "သင့် Bot မန်နေဂျာစနစ် ဖြစ်ပါတယ်။ Sub-bot, Menu, AI, Referral စသည်တို့ကို အသုံးပြုနိုင်ပါတယ်။",
    feature_title: "✨ လုပ်ဆောင်ချက်များ:",
    features: `
• Sub-bot များစီမံခန့်ခွဲရန်
• Button Menu များဖန်တီးရန်
• ဘာသာစကားများ မလွယ်ကူစွာပြောင်းနိုင်ခြင်း
• AI Assistant (နေ့စဉ် 30 မိနစ် / VIP အဆုံးမရှိ)
• လင့်ခ္်မျှဝေရန်နှင့် အကောင့်ဝင်မြတ်တန့်ခြင်း
• USDT ဖြင့် VIP ဝယ်ယူရန်
• VIP သက်တမ်း သတ်မှတ်ရန်
• Broadcast (VIP)
    `,
    choose_action: "👇 ရွေးချယ်ပါ:",

    btn_ai: "🤖 AI အသုံးပြု",
    btn_vip: "👑 VIP",
    btn_ref: "📢 ဖိတ်ကြားမှု",
    btn_subbot: "🤖 Sub-bot",
    btn_lang: "🌐 ဘာသာစကား",
    btn_back: "⬅️ ပြန်သွားမည်",
    btn_menu: "🏠 မူလ Menu",

    ref_title: "📢 ဖိတ်ကြားမှု",
    ref_desc: "သင့် link ကိုမျှဝေပြီး လျော်ကြေးရယူနိုင်ပါတယ်။",
    ref_link: "သင့် link:",
    ref_stats: "📊 စာရင်း:",

    vip_title: "👑 VIP အကျိုးကျေးဇူးများ",
    vip_normal: "သင်သည် အလကား အသုံးပြုသူဖြစ်သည်\nAI: တနေ့ 30 မိနစ်",
    vip_active: "VIP သက်တမ်းကုန်ဆုံးမည့်နေ့:",
    vip_buy: "VIP ရွေးချယ်ရန်:",
    vip_week: "1 အပတ်",
    vip_month: "1 လ",
    vip_quarter: "3 လ",
    vip_year: "1 နှစ်",

    pay_title: "💰 USDT ငွေပေးချေမှု",
    pay_send: "USDT ကို အောက်ပါတေနရိပ်သို့ ပေးပို့ပါ:",
    pay_wait: "⚠️ ပေးပို့ပြီးသောနောက်:\n\npay TXID",

    ai_intro: "သင်၏ AI မိတ်ဆွေ ဖြစ်ပါတယ်။ မေးမြန်းလိုသည်များ မေးပါ။",
  },

};
