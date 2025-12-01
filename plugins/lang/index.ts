// ===========================================
//       YourMenuBot 多语言系统 (15 Languages)
// ===========================================

const LANG = {
  // ============================
  //          English (EN)
  // ============================
  en: {
    system: {
      error: "An error occurred, please try again later.",
      success: "Operation completed successfully.",
      back: "⬅ Back",
      saved: "Settings saved.",
    },

    welcome: {
      start: "Welcome to YourMenuBot!\nPlease choose a function below.",
      bind_required: "Please bind your sub-bot token first to continue.",
    },

    menu: {
      main: "Main Menu",
      subbot: "🤖 Sub-Bot Manager",
      ai: "💡 AI Assistant",
      supply: "📢 Marketplace",
      wallet: "💰 Wallet",
      referral: "🎁 Referral Center",
      vip: "🔧 VIP Center",
      lang: "🌍 Language",
    },

    lang: {
      choose: "Please choose your language:",
      switched: "Language switched.",
    },

    ai: {
      intro: "You can ask any question here.",
      limit: "Free users have 30 minutes of AI time per day. Upgrade to VIP for unlimited access.",
      ask: "Please enter your question:",
    },

    vip: {
      title: "VIP Plans",
      need_vip: "This function requires VIP.",
      purchased: "Your VIP has been activated.",
      plans: {
        week: "7 Days VIP – 5 USDT",
        month: "30 Days VIP – 15 USDT",
        season: "90 Days VIP – 38 USDT",
        year: "365 Days VIP – 158 USDT",
        lifetime: "Lifetime VIP – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `Please send the payment to the following USDT (TRC20) address:\n\`${addr}\`\n\nAfter payment, enter:\n\n*pay HASH*`,
      invalid_tx: "Transaction not found. Please check your hash.",
      vip_extended: "Your VIP has been renewed.",
    },

    wallet: {
      title: "Wallet Center",
      balance: (amt: number) => `Your balance: ${amt} USDT`,
      deposit: {
        title: "Deposit USDT",
        tip: (addr: string) =>
          `Please transfer USDT (TRC20) to:\n\`${addr}\`\n\nAfter completing, send:\n\n*pay HASH*`,
      },
      withdraw: {
        title: "Withdraw",
        ask_addr: "Please enter your TRC20 withdrawal address:",
        ask_amount: "Please enter withdrawal amount:",
        submitted: "Your withdrawal request has been submitted.",
      },
      history: "Transaction History",
    },

    referral: {
      title: "Referral Center",
      your_link: (id: number) =>
        `Your referral link:\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a: number, b: number, c: number) =>
        `Referrals: ${a}\nClicks: ${b}\nIncome: ${c} USDT`,
      withdraw_tip: "Referral rewards are added to your wallet.",
      promote: "Share your link to earn up to 40% commission!",
    },

    subbot: {
      title: "Sub-Bot Manager",
      send_token: "Please send your sub-bot token:",
      saved: "Sub-bot token saved successfully.",
      menu: "Sub-Bot Settings",
      broadcast_basic: "Basic Broadcast (Limited)",
      broadcast_pro: "Media Broadcast (VIP)",
      stats: "Bot Statistics",
      buttons: "Manage Buttons",
    },

    supply: {
      title: "Marketplace",
      post: "Post a new supply/demand message:",
      posted: "Your post has been published.",
      need_vip_top: "Only VIP users can pin posts.",
      all_visible: "All users can see marketplace posts.",
    },

    ads: {
      title: "Advertisement Settings",
      enable: "Enable Ads",
      disable: "Disable Ads",
      vip_hide: "VIP users do not see advertisements.",
    },
  },

    // ============================
  //             中文 (ZH)
  // ============================
  zh: {
    system: {
      error: "发生错误，请稍后重试。",
      success: "操作成功。",
      back: "⬅ 返回",
      saved: "设置已保存。",
    },

    welcome: {
      start: "欢迎使用 YourMenuBot！\n请选择下面的功能。",
      bind_required: "请先绑定你的子机器人 Token 才能继续使用。",
    },

    menu: {
      main: "主菜单",
      subbot: "🤖 子机器人管理",
      ai: "💡 AI 智能助手",
      supply: "📢 供需市场",
      wallet: "💰 钱包中心",
      referral: "🎁 推广中心",
      vip: "🔧 VIP 专区",
      lang: "🌍 语言切换",
    },

    lang: {
      choose: "请选择你的语言：",
      switched: "语言已切换。",
    },

    ai: {
      intro: "你可以在这里问任何问题。",
      limit: "普通用户每天仅可使用 30 分钟 AI。升级 VIP 可无限使用。",
      ask: "请输入你的问题：",
    },

    vip: {
      title: "VIP 套餐",
      need_vip: "该功能需要 VIP。",
      purchased: "你的 VIP 已激活。",
      plans: {
        week: "周卡 VIP – 5 USDT",
        month: "月卡 VIP – 15 USDT",
        season: "季卡 VIP – 38 USDT",
        year: "年卡 VIP – 158 USDT",
        lifetime: "终身 VIP – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `请向以下 USDT（TRC20）地址付款：\n\`${addr}\`\n\n付款完成后，请输入：\n\n*pay 交易HASH*`,
      invalid_tx: "未找到交易，请检查你的 HASH 是否正确。",
      vip_extended: "你的 VIP 已续费。",
    },

    wallet: {
      title: "钱包中心",
      balance: (amt: number) => `你的余额：${amt} USDT`,
      deposit: {
        title: "充值 USDT",
        tip: (addr: string) =>
          `请将 USDT（TRC20）转入以下地址：\n\`${addr}\`\n\n完成后请发送：\n\n*pay 交易HASH*`,
      },
      withdraw: {
        title: "提现",
        ask_addr: "请输入你的 TRC20 提现地址：",
        ask_amount: "请输入提现金额：",
        submitted: "你的提现申请已提交。",
      },
      history: "交易记录",
    },

    referral: {
      title: "推广中心",
      your_link: (id: number) =>
        `你的专属推广链接：\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a: number, b: number, c: number) =>
        `成功邀请：${a}\n点击次数：${b}\n收益：${c} USDT`,
      withdraw_tip: "推广佣金将自动加入你的钱包余额。",
      promote: "分享推广链接，可赚取最高 40% 分成！",
    },

    subbot: {
      title: "子机器人管理",
      send_token: "请发送你的子机器人 Token：",
      saved: "子机器人 Token 已保存。",
      menu: "子机器人设置",
      broadcast_basic: "文字广播（基础版）",
      broadcast_pro: "媒体广播（VIP）",
      stats: "机器人统计",
      buttons: "管理按钮",
    },

    supply: {
      title: "供需市场",
      post: "发布一个新的供需消息：",
      posted: "你的供需信息已发布。",
      need_vip_top: "仅 VIP 用户可以置顶消息。",
      all_visible: "所有用户均可查看市场内容。",
    },

    ads: {
      title: "广告设置",
      enable: "开启广告",
      disable: "关闭广告",
      vip_hide: "VIP 用户不会看到广告。",
    },
  },

    // ============================
  //             日本語 (JP)
  // ============================
  jp: {
    system: {
      error: "エラーが発生しました。しばらくしてから再試行してください。",
      success: "操作が正常に完了しました。",
      back: "⬅ 戻る",
      saved: "設定が保存されました。",
    },

    welcome: {
      start: "YourMenuBotへようこそ！\n以下のメニューから選択してください。",
      bind_required: "続行するには、まずサブボットのトークンを登録してください。",
    },

    menu: {
      main: "メインメニュー",
      subbot: "🤖 サブボット管理",
      ai: "💡 AIアシスタント",
      supply: "📢 マーケット掲示板",
      wallet: "💰 ウォレット",
      referral: "🎁 招待センター",
      vip: "🔧 VIPセンター",
      lang: "🌍 言語設定",
    },

    lang: {
      choose: "言語を選択してください：",
      switched: "言語が変更されました。",
    },

    ai: {
      intro: "ここで質問を入力できます。",
      limit: "無料ユーザーは1日30分のAI利用が可能です。VIPにアップグレードすると無制限になります。",
      ask: "質問を入力してください：",
    },

    vip: {
      title: "VIPプラン",
      need_vip: "この機能を利用するにはVIPが必要です。",
      purchased: "VIPが有効になりました。",
      plans: {
        week: "7日間VIP – 5 USDT",
        month: "30日間VIP – 15 USDT",
        season: "90日間VIP – 38 USDT",
        year: "365日間VIP – 158 USDT",
        lifetime: "永久VIP – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `以下のUSDT（TRC20）アドレスに送金してください：\n\`${addr}\`\n\n送金後、次の形式で入力してください：\n\n*pay 取引ハッシュ*`,
      invalid_tx: "取引が見つかりません。ハッシュを確認してください。",
      vip_extended: "VIP期間が更新されました。",
    },

    wallet: {
      title: "ウォレットセンター",
      balance: (amt: number) => `あなたの残高：${amt} USDT`,
      deposit: {
        title: "USDT入金",
        tip: (addr: string) =>
          `以下のアドレスにUSDT（TRC20）を送金してください：\n\`${addr}\`\n\n完了後、次を入力：\n\n*pay 取引ハッシュ*`,
      },
      withdraw: {
        title: "出金",
        ask_addr: "出金先のTRC20アドレスを入力してください：",
        ask_amount: "出金額を入力してください：",
        submitted: "出金申請が送信されました。",
      },
      history: "取引履歴",
    },

    referral: {
      title: "招待センター",
      your_link: (id: number) =>
        `あなたの招待リンク：\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a: number, b: number, c: number) =>
        `招待人数：${a}\nクリック数：${b}\n報酬：${c} USDT`,
      withdraw_tip: "招待報酬はウォレット残高に追加されます。",
      promote: "リンクを共有して最大40%の報酬を獲得！",
    },

    subbot: {
      title: "サブボット管理",
      send_token: "サブボットのトークンを送信してください：",
      saved: "サブボットのトークンが保存されました。",
      menu: "サブボット設定",
      broadcast_basic: "基本ブロードキャスト（文字のみ）",
      broadcast_pro: "メディアブロードキャスト（VIP）",
      stats: "統計情報",
      buttons: "ボタン管理",
    },

    supply: {
      title: "マーケット掲示板",
      post: "新しい投稿内容を入力してください：",
      posted: "投稿が公開されました。",
      need_vip_top: "投稿の固定はVIPユーザーのみ可能です。",
      all_visible: "全てのユーザーが投稿を閲覧できます。",
    },

    ads: {
      title: "広告設定",
      enable: "広告を有効にする",
      disable: "広告を無効にする",
      vip_hide: "VIPユーザーは広告が表示されません。",
    },
  },

    // ============================
  //              한국어 (KR)
  // ============================
  kr: {
    system: {
      error: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      success: "작업이 성공적으로 완료되었습니다.",
      back: "⬅ 돌아가기",
      saved: "설정이 저장되었습니다.",
    },

    welcome: {
      start: "YourMenuBot에 오신 것을 환영합니다!\n아래 메뉴에서 기능을 선택하세요.",
      bind_required: "계속하려면 먼저 서브봇 토큰을 등록해야 합니다.",
    },

    menu: {
      main: "메인 메뉴",
      subbot: "🤖 서브봇 관리",
      ai: "💡 AI 어시스턴트",
      supply: "📢 공급/수요 마켓",
      wallet: "💰 지갑",
      referral: "🎁 추천 센터",
      vip: "🔧 VIP 센터",
      lang: "🌍 언어 변경",
    },

    lang: {
      choose: "언어를 선택해주세요:",
      switched: "언어가 변경되었습니다.",
    },

    ai: {
      intro: "여기에서 어떤 질문이든 입력할 수 있습니다.",
      limit: "무료 사용자는 하루 30분만 AI를 사용할 수 있습니다. VIP로 업그레이드하면 무제한 이용 가능합니다.",
      ask: "질문을 입력해주세요:",
    },

    vip: {
      title: "VIP 플랜",
      need_vip: "이 기능을 사용하려면 VIP가 필요합니다.",
      purchased: "VIP가 활성화되었습니다.",
      plans: {
        week: "7일 VIP – 5 USDT",
        month: "30일 VIP – 15 USDT",
        season: "90일 VIP – 38 USDT",
        year: "365일 VIP – 158 USDT",
        lifetime: "평생 VIP – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `다음 USDT(TRC20) 주소로 송금해주세요:\n\`${addr}\`\n\n송금 후 다음 형식으로 입력하세요:\n\n*pay 거래해시*`,
      invalid_tx: "거래를 찾을 수 없습니다. 해시 값을 확인해주세요.",
      vip_extended: "VIP 기간이 연장되었습니다.",
    },

    wallet: {
      title: "지갑 센터",
      balance: (amt: number) => `현재 잔액: ${amt} USDT`,
      deposit: {
        title: "USDT 입금",
        tip: (addr: string) =>
          `다음 주소로 USDT(TRC20)를 송금해주세요:\n\`${addr}\`\n\n완료 후 다음과 같이 입력하세요:\n\n*pay 거래해시*`,
      },
      withdraw: {
        title: "출금",
        ask_addr: "출금 받을 TRC20 주소를 입력해주세요:",
        ask_amount: "출금 금액을 입력해주세요:",
        submitted: "출금 요청이 제출되었습니다.",
      },
      history: "거래 내역",
    },

    referral: {
      title: "추천 센터",
      your_link: (id: number) =>
        `당신의 추천 링크:\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a: number, b: number, c: number) =>
        `추천 수: ${a}\n클릭 수: ${b}\n수익: ${c} USDT`,
      withdraw_tip: "추천 보상은 지갑 잔액에 자동으로 추가됩니다.",
      promote: "추천 링크를 공유하면 최대 40%의 수익을 받을 수 있습니다!",
    },

    subbot: {
      title: "서브봇 관리",
      send_token: "서브봇 토큰을 입력해주세요:",
      saved: "서브봇 토큰이 저장되었습니다.",
      menu: "서브봇 설정",
      broadcast_basic: "기본 브로드캐스트 (문자)",
      broadcast_pro: "미디어 브로드캐스트 (VIP)",
      stats: "봇 통계",
      buttons: "버튼 관리",
    },

    supply: {
      title: "공급/수요 마켓",
      post: "새 게시글 내용을 입력하세요:",
      posted: "게시글이 등록되었습니다.",
      need_vip_top: "게시글 상단 고정은 VIP 전용 기능입니다.",
      all_visible: "모든 사용자가 게시글을 볼 수 있습니다.",
    },

    ads: {
      title: "광고 설정",
      enable: "광고 켜기",
      disable: "광고 끄기",
      vip_hide: "VIP 사용자는 광고가 표시되지 않습니다.",
    },
  },

    // ============================
  //               ภาษาไทย (TH)
  // ============================
  th: {
    system: {
      error: "เกิดข้อผิดพลาด โปรดลองใหม่ภายหลัง",
      success: "ดำเนินการสำเร็จแล้ว",
      back: "⬅ กลับ",
      saved: "บันทึกการตั้งค่าเรียบร้อย",
    },

    welcome: {
      start: "ยินดีต้อนรับเข้าสู่ YourMenuBot!\nกรุณาเลือกเมนูด้านล่าง",
      bind_required: "กรุณาเชื่อมต่อโทเคนบอทย่อยก่อนใช้งานต่อ",
    },

    menu: {
      main: "เมนูหลัก",
      subbot: "🤖 จัดการบอทย่อย",
      ai: "💡 ผู้ช่วย AI",
      supply: "📢 กระดานซื้อขาย",
      wallet: "💰 กระเป๋าสตางค์",
      referral: "🎁 ศูนย์แนะนำเพื่อน",
      vip: "🔧 ศูนย์ VIP",
      lang: "🌍 เปลี่ยนภาษา",
    },

    lang: {
      choose: "กรุณาเลือกภาษา:",
      switched: "เปลี่ยนภาษาเรียบร้อยแล้ว",
    },

    ai: {
      intro: "คุณสามารถพิมพ์คำถามใด ๆ ได้ที่นี่",
      limit: "ผู้ใช้ฟรีสามารถใช้ AI ได้ 30 นาทีต่อวัน อัปเกรด VIP เพื่อใช้งานได้ไม่จำกัด",
      ask: "กรุณาพิมพ์คำถาม:",
    },

    vip: {
      title: "แพ็กเกจ VIP",
      need_vip: "ฟีเจอร์นี้ต้องใช้ VIP",
      purchased: "เปิดใช้งาน VIP สำเร็จแล้ว",
      plans: {
        week: "VIP 7 วัน – 5 USDT",
        month: "VIP 30 วัน – 15 USDT",
        season: "VIP 90 วัน – 38 USDT",
        year: "VIP 365 วัน – 158 USDT",
        lifetime: "VIP ตลอดชีพ – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `กรุณาโอน USDT (TRC20) ไปที่:\n\`${addr}\`\n\nหลังจากโอนแล้ว กรุณากรอก:\n\n*pay หมายเลขธุรกรรม*`,
      invalid_tx: "ไม่พบธุรกรรม กรุณาตรวจสอบหมายเลขอีกครั้ง",
      vip_extended: "ต่ออายุ VIP สำเร็จแล้ว",
    },

    wallet: {
      title: "กระเป๋าสตางค์",
      balance: (amt: number) => `ยอดเงินของคุณ: ${amt} USDT`,
      deposit: {
        title: "เติมเงิน USDT",
        tip: (addr: string) =>
          `กรุณาโอน USDT (TRC20) ไปยังที่อยู่:\n\`${addr}\`\n\nหลังจากเสร็จสิ้น ให้ส่งข้อความ:\n\n*pay หมายเลขธุรกรรม*`,
      },
      withdraw: {
        title: "ถอนเงิน",
        ask_addr: "กรุณากรอกที่อยู่ TRC20:",
        ask_amount: "กรุณากรอกจำนวนเงิน:",
        submitted: "ส่งคำขอถอนเงินเรียบร้อยแล้ว",
      },
      history: "ประวัติธุรกรรม",
    },

    referral: {
      title: "แนะนำเพื่อน",
      your_link: (id: number) =>
        `ลิงก์แนะนำของคุณ:\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a: number, b: number, c: number) =>
        `แนะนำสำเร็จ: ${a}\nคลิก: ${b}\nรายได้: ${c} USDT`,
      withdraw_tip: "รายได้จากการแนะนำจะถูกเพิ่มเข้ากระเป๋าเงินของคุณโดยอัตโนมัติ",
      promote: "แชร์ลิงก์ของคุณและรับรายได้สูงสุด 40%!",
    },

    subbot: {
      title: "จัดการบอทย่อย",
      send_token: "กรุณาส่งโทเคนบอทย่อย:",
      saved: "บันทึกโทเคนบอทย่อยเรียบร้อยแล้ว",
      menu: "ตั้งค่าบอทย่อย",
      broadcast_basic: "กระจายข้อความ (พื้นฐาน)",
      broadcast_pro: "กระจายมีเดีย (VIP)",
      stats: "สถิติ",
      buttons: "จัดการปุ่ม",
    },

    supply: {
      title: "กระดานซื้อขาย",
      post: "กรอกรายละเอียดโพสต์ใหม่:",
      posted: "โพสต์ของคุณถูกเผยแพร่แล้ว",
      need_vip_top: "การปักหมุดโพสต์เฉพาะ VIP เท่านั้น",
      all_visible: "ผู้ใช้ทุกคนสามารถดูโพสต์ได้",
    },

    ads: {
      title: "การตั้งค่าโฆษณา",
      enable: "เปิดโฆษณา",
      disable: "ปิดโฆษณา",
      vip_hide: "ผู้ใช้ VIP จะไม่เห็นโฆษณา",
    },
  },

    // ============================
  //               Tiếng Việt (VN)
  // ============================
  vn: {
    system: {
      error: "Đã xảy ra lỗi, vui lòng thử lại sau.",
      success: "Thao tác đã hoàn tất.",
      back: "⬅ Quay lại",
      saved: "Đã lưu cài đặt.",
    },

    welcome: {
      start: "Chào mừng đến với YourMenuBot!\nVui lòng chọn một chức năng bên dưới.",
      bind_required: "Vui lòng liên kết token bot phụ trước khi tiếp tục.",
    },

    menu: {
      main: "Menu chính",
      subbot: "🤖 Quản lý Bot phụ",
      ai: "💡 Trợ lý AI",
      supply: "📢 Chợ giao dịch",
      wallet: "💰 Ví tiền",
      referral: "🎁 Trung tâm giới thiệu",
      vip: "🔧 Khu vực VIP",
      lang: "🌍 Ngôn ngữ",
    },

    lang: {
      choose: "Vui lòng chọn ngôn ngữ:",
      switched: "Đã thay đổi ngôn ngữ.",
    },

    ai: {
      intro: "Bạn có thể nhập bất kỳ câu hỏi nào tại đây.",
      limit: "Người dùng miễn phí chỉ được dùng AI 30 phút mỗi ngày. Nâng cấp VIP để sử dụng không giới hạn.",
      ask: "Vui lòng nhập câu hỏi:",
    },

    vip: {
      title: "Gói VIP",
      need_vip: "Chức năng này yêu cầu VIP.",
      purchased: "VIP của bạn đã được kích hoạt.",
      plans: {
        week: "VIP 7 ngày – 5 USDT",
        month: "VIP 30 ngày – 15 USDT",
        season: "VIP 90 ngày – 38 USDT",
        year: "VIP 365 ngày – 158 USDT",
        lifetime: "VIP trọn đời – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `Vui lòng gửi USDT (TRC20) vào địa chỉ sau:\n\`${addr}\`\n\nSau khi gửi, nhập:\n\n*pay mã_giao_dịch*`,
      invalid_tx: "Không tìm thấy giao dịch, vui lòng kiểm tra lại mã.",
      vip_extended: "VIP của bạn đã được gia hạn.",
    },

    wallet: {
      title: "Ví tiền",
      balance: (amt: number) => `Số dư của bạn: ${amt} USDT`,
      deposit: {
        title: "Nạp USDT",
        tip: (addr: string) =>
          `Vui lòng gửi USDT (TRC20) đến địa chỉ:\n\`${addr}\`\n\nSau khi hoàn tất, nhập:\n\n*pay mã_giao_dịch*`,
      },
      withdraw: {
        title: "Rút tiền",
        ask_addr: "Vui lòng nhập địa chỉ TRC20:",
        ask_amount: "Vui lòng nhập số tiền:",
        submitted: "Yêu cầu rút tiền đã được gửi.",
      },
      history: "Lịch sử giao dịch",
    },

    referral: {
      title: "Trung tâm giới thiệu",
      your_link: (id: number) =>
        `Liên kết giới thiệu của bạn:\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a: number, b: number, c: number) =>
        `Giới thiệu thành công: ${a}\nLượt nhấp: ${b}\nThu nhập: ${c} USDT`,
      withdraw_tip: "Hoa hồng sẽ được cộng vào số dư ví của bạn.",
      promote: "Chia sẻ liên kết để nhận hoa hồng lên đến 40%!",
    },

    subbot: {
      title: "Quản lý Bot phụ",
      send_token: "Vui lòng gửi token bot phụ:",
      saved: "Đã lưu token bot phụ.",
      menu: "Cài đặt Bot phụ",
      broadcast_basic: "Gửi tin nhắn (Cơ bản)",
      broadcast_pro: "Gửi đa phương tiện (VIP)",
      stats: "Thống kê",
      buttons: "Quản lý nút",
    },

    supply: {
      title: "Chợ giao dịch",
      post: "Nhập nội dung bài đăng mới:",
      posted: "Bài đăng của bạn đã được đăng.",
      need_vip_top: "Chức năng ghim bài chỉ dành cho VIP.",
      all_visible: "Mọi người đều có thể xem nội dung.",
    },

    ads: {
      title: "Cài đặt quảng cáo",
      enable: "Bật quảng cáo",
      disable: "Tắt quảng cáo",
      vip_hide: "Người dùng VIP sẽ không thấy quảng cáo.",
    },
  },

  
