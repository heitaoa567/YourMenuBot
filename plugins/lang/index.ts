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

    // ============================
  //           Bahasa Indonesia (ID)
  // ============================
  id: {
    system: {
      error: "Terjadi kesalahan, silakan coba lagi nanti.",
      success: "Operasi berhasil.",
      back: "⬅ Kembali",
      saved: "Pengaturan telah disimpan.",
    },

    welcome: {
      start: "Selamat datang di YourMenuBot!\nSilakan pilih menu di bawah ini.",
      bind_required: "Silakan kirim token sub-bot terlebih dahulu untuk melanjutkan.",
    },

    menu: {
      main: "Menu Utama",
      subbot: "🤖 Manajemen Sub-Bot",
      ai: "💡 Asisten AI",
      supply: "📢 Pasar Permintaan & Penawaran",
      wallet: "💰 Dompet",
      referral: "🎁 Pusat Referral",
      vip: "🔧 Pusat VIP",
      lang: "🌍 Bahasa",
    },

    lang: {
      choose: "Silakan pilih bahasa:",
      switched: "Bahasa telah diubah.",
    },

    ai: {
      intro: "Anda dapat menanyakan apa saja di sini.",
      limit: "Pengguna gratis dapat menggunakan AI selama 30 menit per hari. Tingkatkan ke VIP untuk akses tanpa batas.",
      ask: "Silakan masukkan pertanyaan Anda:",
    },

    vip: {
      title: "Paket VIP",
      need_vip: "Fitur ini memerlukan VIP.",
      purchased: "VIP Anda telah diaktifkan.",
      plans: {
        week: "VIP 7 Hari – 5 USDT",
        month: "VIP 30 Hari – 15 USDT",
        season: "VIP 90 Hari – 38 USDT",
        year: "VIP 365 Hari – 158 USDT",
        lifetime: "VIP Seumur Hidup – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `Silakan kirim USDT (TRC20) ke alamat berikut:\n\`${addr}\`\n\nSetelah transfer, kirimkan:\n\n*pay TXID*`,
      invalid_tx: "Transaksi tidak ditemukan. Silakan periksa TXID Anda.",
      vip_extended: "VIP Anda telah diperpanjang.",
    },

    wallet: {
      title: "Pusat Dompet",
      balance: (amt: number) => `Saldo Anda: ${amt} USDT`,
      deposit: {
        title: "Deposit USDT",
        tip: (addr: string) =>
          `Silakan transfer USDT (TRC20) ke alamat berikut:\n\`${addr}\`\n\nSetelah selesai, kirimkan:\n\n*pay TXID*`,
      },
      withdraw: {
        title: "Penarikan",
        ask_addr: "Masukkan alamat TRC20 untuk penarikan:",
        ask_amount: "Masukkan jumlah penarikan:",
        submitted: "Permintaan penarikan Anda telah dikirim.",
      },
      history: "Riwayat Transaksi",
    },

    referral: {
      title: "Pusat Referral",
      your_link: (id: number) =>
        `Tautan referral Anda:\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a: number, b: number, c: number) =>
        `Referral sukses: ${a}\nKlik: ${b}\nPendapatan: ${c} USDT`,
      withdraw_tip: "Pendapatan referral akan langsung ditambahkan ke dompet Anda.",
      promote: "Bagikan tautan Anda untuk mendapatkan hingga 40% komisi!",
    },

    subbot: {
      title: "Manajemen Sub-Bot",
      send_token: "Silakan kirim token sub-bot Anda:",
      saved: "Token sub-bot berhasil disimpan.",
      menu: "Pengaturan Sub-Bot",
      broadcast_basic: "Broadcast Teks (Dasar)",
      broadcast_pro: "Broadcast Media (VIP)",
      stats: "Statistik Bot",
      buttons: "Kelola Tombol",
    },

    supply: {
      title: "Pasar Permintaan & Penawaran",
      post: "Masukkan konten posting baru:",
      posted: "Posting Anda telah dipublikasikan.",
      need_vip_top: "Hanya VIP yang dapat memasang posting teratas.",
      all_visible: "Semua pengguna dapat melihat postingan.",
    },

    ads: {
      title: "Pengaturan Iklan",
      enable: "Aktifkan Iklan",
      disable: "Nonaktifkan Iklan",
      vip_hide: "Pengguna VIP tidak melihat iklan.",
    },
  },

    // ============================
  //              Bahasa Melayu (MY)
  // ============================
  my: {
    system: {
      error: "Ralat berlaku, sila cuba lagi kemudian.",
      success: "Tindakan berjaya.",
      back: "⬅ Kembali",
      saved: "Tetapan telah disimpan.",
    },

    welcome: {
      start: "Selamat datang ke YourMenuBot!\nSila pilih fungsi di bawah.",
      bind_required: "Sila sambungkan token sub-bot terlebih dahulu untuk meneruskan.",
    },

    menu: {
      main: "Menu Utama",
      subbot: "🤖 Pengurusan Sub-Bot",
      ai: "💡 Pembantu AI",
      supply: "📢 Pasaran Permintaan & Tawaran",
      wallet: "💰 Dompet",
      referral: "🎁 Pusat Rujukan",
      vip: "🔧 Pusat VIP",
      lang: "🌍 Bahasa",
    },

    lang: {
      choose: "Sila pilih bahasa:",
      switched: "Bahasa telah ditukar.",
    },

    ai: {
      intro: "Anda boleh bertanya apa sahaja di sini.",
      limit: "Pengguna percuma hanya boleh menggunakan AI selama 30 minit sehari. Naik taraf ke VIP untuk akses tanpa had.",
      ask: "Sila masukkan soalan anda:",
    },

    vip: {
      title: "Pelan VIP",
      need_vip: "Fungsi ini memerlukan VIP.",
      purchased: "VIP anda telah diaktifkan.",
      plans: {
        week: "VIP 7 Hari – 5 USDT",
        month: "VIP 30 Hari – 15 USDT",
        season: "VIP 90 Hari – 38 USDT",
        year: "VIP 365 Hari – 158 USDT",
        lifetime: "VIP Seumur Hidup – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `Sila hantar USDT (TRC20) ke alamat berikut:\n\`${addr}\`\n\nSelepas pembayaran, masukkan:\n\n*pay TXID*`,
      invalid_tx: "Transaksi tidak dijumpai. Sila semak TXID anda.",
      vip_extended: "VIP anda telah diperbaharui.",
    },

    wallet: {
      title: "Pusat Dompet",
      balance: (amt: number) => `Baki anda: ${amt} USDT`,
      deposit: {
        title: "Deposit USDT",
        tip: (addr: string) =>
          `Sila pindahkan USDT (TRC20) ke alamat berikut:\n\`${addr}\`\n\nSelepas selesai, masukkan:\n\n*pay TXID*`,
      },
      withdraw: {
        title: "Pengeluaran",
        ask_addr: "Masukkan alamat TRC20 anda:",
        ask_amount: "Masukkan jumlah pengeluaran:",
        submitted: "Permintaan pengeluaran telah dihantar.",
      },
      history: "Sejarah Transaksi",
    },

    referral: {
      title: "Pusat Rujukan",
      your_link: (id: number) =>
        `Pautan rujukan anda:\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a: number, b: number, c: number) =>
        `Rujukan berjaya: ${a}\nKlik: ${b}\nPendapatan: ${c} USDT`,
      withdraw_tip: "Pendapatan rujukan akan ditambah ke baki dompet anda secara automatik.",
      promote: "Kongsi pautan anda dan dapatkan komisen sehingga 40%!",
    },

    subbot: {
      title: "Pengurusan Sub-Bot",
      send_token: "Sila hantar token sub-bot anda:",
      saved: "Token sub-bot berjaya disimpan.",
      menu: "Tetapan Sub-Bot",
      broadcast_basic: "Siaran Teks (Asas)",
      broadcast_pro: "Siaran Media (VIP)",
      stats: "Statistik Bot",
      buttons: "Urus Butang",
    },

    supply: {
      title: "Pasaran Permintaan & Tawaran",
      post: "Masukkan kandungan siaran baharu:",
      posted: "Siaran anda telah diterbitkan.",
      need_vip_top: "Hanya pengguna VIP boleh menetapkan siaran di bahagian atas.",
      all_visible: "Semua pengguna boleh melihat siaran.",
    },

    ads: {
      title: "Tetapan Iklan",
      enable: "Aktifkan Iklan",
      disable: "Nyahaktifkan Iklan",
      vip_hide: "Pengguna VIP tidak akan melihat iklan.",
    },
  },

    // ============================
  //                 العربية (AR)
  // ============================
  ar: {
    system: {
      error: "حدث خطأ، يرجى المحاولة لاحقًا.",
      success: "تمت العملية بنجاح.",
      back: "⬅ العودة",
      saved: "تم حفظ الإعدادات.",
    },

    welcome: {
      start: "مرحبًا بك في YourMenuBot!\nيرجى اختيار وظيفة من الأسفل.",
      bind_required: "يرجى ربط رمز البوت الفرعي أولاً للمتابعة.",
    },

    menu: {
      main: "القائمة الرئيسية",
      subbot: "🤖 إدارة البوت الفرعي",
      ai: "💡 مساعد الذكاء الاصطناعي",
      supply: "📢 سوق العرض والطلب",
      wallet: "💰 المحفظة",
      referral: "🎁 مركز الإحالة",
      vip: "🔧 مركز VIP",
      lang: "🌍 اللغة",
    },

    lang: {
      choose: "يرجى اختيار اللغة:",
      switched: "تم تغيير اللغة.",
    },

    ai: {
      intro: "يمكنك طرح أي سؤال هنا.",
      limit: "يمكن للمستخدمين المجانيين استخدام الذكاء الاصطناعي لمدة 30 دقيقة يوميًا. قم بالترقية إلى VIP للوصول غير المحدود.",
      ask: "يرجى إدخال سؤالك:",
    },

    vip: {
      title: "خطط VIP",
      need_vip: "هذه الميزة تتطلب VIP.",
      purchased: "تم تفعيل VIP الخاص بك.",
      plans: {
        week: "VIP لمدة 7 أيام – 5 USDT",
        month: "VIP لمدة 30 يومًا – 15 USDT",
        season: "VIP لمدة 90 يومًا – 38 USDT",
        year: "VIP لمدة 365 يومًا – 158 USDT",
        lifetime: "VIP مدى الحياة – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `يرجى إرسال USDT (TRC20) إلى العنوان التالي:\n\`${addr}\`\n\nبعد الدفع، أدخل:\n\n*pay رقم_المعاملة*`,
      invalid_tx: "لم يتم العثور على المعاملة. يرجى التحقق من رقم المعاملة.",
      vip_extended: "تم تمديد مدة VIP الخاصة بك.",
    },

    wallet: {
      title: "المحفظة",
      balance: (amt: number) => `رصيدك: ${amt} USDT`,
      deposit: {
        title: "إيداع USDT",
        tip: (addr: string) =>
          `يرجى إرسال USDT (TRC20) إلى العنوان:\n\`${addr}\`\n\nبعد الإرسال، أدخل:\n\n*pay رقم_المعاملة*`,
      },
      withdraw: {
        title: "السحب",
        ask_addr: "يرجى إدخال عنوان TRC20:",
        ask_amount: "يرجى إدخال المبلغ:",
        submitted: "تم إرسال طلب السحب.",
      },
      history: "سجل المعاملات",
    },

    referral: {
      title: "مركز الإحالة",
      your_link: (id: number) =>
        `رابط الإحالة الخاص بك:\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a: number, b: number, c: number) =>
        `الإحالات الناجحة: ${a}\nعدد النقرات: ${b}\nالأرباح: ${c} USDT`,
      withdraw_tip: "ستتم إضافة عمولات الإحالة إلى رصيد محفظتك.",
      promote: "شارك رابطك واحصل على عمولة تصل إلى 40٪!",
    },

    subbot: {
      title: "إدارة البوت الفرعي",
      send_token: "يرجى إرسال رمز البوت الفرعي:",
      saved: "تم حفظ رمز البوت الفرعي.",
      menu: "إعدادات البوت الفرعي",
      broadcast_basic: "بث نصي (أساسي)",
      broadcast_pro: "بث وسائط (VIP)",
      stats: "إحصائيات البوت",
      buttons: "إدارة الأزرار",
    },

    supply: {
      title: "سوق العرض والطلب",
      post: "يرجى إدخال محتوى الإعلان الجديد:",
      posted: "تم نشر إعلانك.",
      need_vip_top: "تثبيت الإعلان يتطلب VIP.",
      all_visible: "يمكن لجميع المستخدمين مشاهدة الإعلانات.",
    },

    ads: {
      title: "إعدادات الإعلانات",
      enable: "تفعيل الإعلانات",
      disable: "إيقاف الإعلانات",
      vip_hide: "مستخدمو VIP لن يروا الإعلانات.",
    },
  },

    // ============================
  //                Русский (RU)
  // ============================
  ru: {
    system: {
      error: "Произошла ошибка. Пожалуйста, повторите позже.",
      success: "Операция успешно выполнена.",
      back: "⬅ Назад",
      saved: "Настройки сохранены.",
    },

    welcome: {
      start: "Добро пожаловать в YourMenuBot!\nПожалуйста, выберите функцию ниже.",
      bind_required: "Чтобы продолжить, сначала привяжите токен суб-бота.",
    },

    menu: {
      main: "Главное меню",
      subbot: "🤖 Управление суб-ботом",
      ai: "💡 AI Ассистент",
      supply: "📢 Маркетплейс",
      wallet: "💰 Кошелёк",
      referral: "🎁 Реферальный центр",
      vip: "🔧 VIP Центр",
      lang: "🌍 Язык",
    },

    lang: {
      choose: "Выберите язык:",
      switched: "Язык успешно изменён.",
    },

    ai: {
      intro: "Вы можете задать любой вопрос здесь.",
      limit: "Бесплатные пользователи могут использовать AI только 30 минут в день. VIP — без ограничений.",
      ask: "Введите ваш вопрос:",
    },

    vip: {
      title: "VIP Тарифы",
      need_vip: "Эта функция доступна только VIP пользователям.",
      purchased: "Ваш VIP активирован.",
      plans: {
        week: "VIP 7 дней – 5 USDT",
        month: "VIP 30 дней – 15 USDT",
        season: "VIP 90 дней – 38 USDT",
        year: "VIP 365 дней – 158 USDT",
        lifetime: "VIP навсегда – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `Отправьте USDT (TRC20) на адрес:\n\`${addr}\`\n\nПосле отправки введите:\n\n*pay TXID*`,
      invalid_tx: "Транзакция не найдена. Проверьте TXID.",
      vip_extended: "Ваш VIP продлён.",
    },

    wallet: {
      title: "Кошелёк",
      balance: (amt: number) => `Ваш баланс: ${amt} USDT`,
      deposit: {
        title: "Пополнение USDT",
        tip: (addr: string) =>
          `Отправьте USDT (TRC20) на адрес:\n\`${addr}\`\n\nПосле завершения введите:\n\n*pay TXID*`,
      },
      withdraw: {
        title: "Вывод средств",
        ask_addr: "Введите TRC20 адрес для вывода:",
        ask_amount: "Введите сумму вывода:",
        submitted: "Запрос на вывод отправлен.",
      },
      history: "История транзакций",
    },

    referral: {
      title: "Реферальный центр",
      your_link: (id: number) =>
        `Ваша реферальная ссылка:\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a: number, b: number, c: number) =>
        `Успешные приглашения: ${a}\nКлики: ${b}\nДоход: ${c} USDT`,
      withdraw_tip: "Реферальный доход автоматически зачисляется на ваш баланс.",
      promote: "Делитесь ссылкой и получайте до 40% комиссии!",
    },

    subbot: {
      title: "Управление суб-ботом",
      send_token: "Отправьте токен суб-бота:",
      saved: "Токен успешно сохранён.",
      menu: "Настройки суб-бота",
      broadcast_basic: "Текстовая рассылка (базовая)",
      broadcast_pro: "Медиа рассылка (VIP)",
      stats: "Статистика бота",
      buttons: "Управление кнопками",
    },

    supply: {
      title: "Маркетплейс",
      post: "Введите содержание нового объявления:",
      posted: "Ваше объявление опубликовано.",
      need_vip_top: "Закрепить объявление могут только VIP пользователи.",
      all_visible: "Все пользователи могут просматривать объявления.",
    },

    ads: {
      title: "Настройки рекламы",
      enable: "Включить рекламу",
      disable: "Выключить рекламу",
      vip_hide: "VIP пользователи не видят рекламу.",
    },
  },

    // ============================
  //               Español (ES)
  // ============================
  es: {
    system: {
      error: "Ocurrió un error. Por favor, inténtalo más tarde.",
      success: "Operación completada con éxito.",
      back: "⬅ Volver",
      saved: "Configuración guardada.",
    },

    welcome: {
      start: "¡Bienvenido a YourMenuBot!\nPor favor, selecciona una función.",
      bind_required: "Primero debes vincular el token de tu sub-bot para continuar.",
    },

    menu: {
      main: "Menú Principal",
      subbot: "🤖 Administrar Sub-Bot",
      ai: "💡 Asistente AI",
      supply: "📢 Mercado",
      wallet: "💰 Billetera",
      referral: "🎁 Centro de Referidos",
      vip: "🔧 Centro VIP",
      lang: "🌍 Idioma",
    },

    lang: {
      choose: "Por favor, selecciona un idioma:",
      switched: "Idioma cambiado correctamente.",
    },

    ai: {
      intro: "Puedes hacer cualquier pregunta aquí.",
      limit: "Los usuarios gratuitos solo pueden usar AI durante 30 minutos al día. Actualiza a VIP para uso ilimitado.",
      ask: "Ingresa tu pregunta:",
    },

    vip: {
      title: "Planes VIP",
      need_vip: "Esta función requiere VIP.",
      purchased: "Tu VIP ha sido activado.",
      plans: {
        week: "VIP 7 días – 5 USDT",
        month: "VIP 30 días – 15 USDT",
        season: "VIP 90 días – 38 USDT",
        year: "VIP 365 días – 158 USDT",
        lifetime: "VIP de por vida – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `Envía USDT (TRC20) a la siguiente dirección:\n\`${addr}\`\n\nDespués del pago, envía:\n\n*pay TXID*`,
      invalid_tx: "Transacción no encontrada. Verifica el TXID.",
      vip_extended: "Tu suscripción VIP ha sido renovada.",
    },

    wallet: {
      title: "Billetera",
      balance: (amt: number) => `Tu saldo: ${amt} USDT`,
      deposit: {
        title: "Depositar USDT",
        tip: (addr: string) =>
          `Envía USDT (TRC20) a la dirección:\n\`${addr}\`\n\nCuando termines, envía:\n\n*pay TXID*`,
      },
      withdraw: {
        title: "Retirar",
        ask_addr: "Ingresa tu dirección TRC20:",
        ask_amount: "Ingresa la cantidad a retirar:",
        submitted: "Tu solicitud de retiro ha sido enviada.",
      },
      history: "Historial de Transacciones",
    },

    referral: {
      title: "Centro de Referidos",
      your_link: (id: number) =>
        `Tu enlace de referido:\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a, b, c) =>
        `Referidos exitosos: ${a}\nClics: ${b}\nGanancias: ${c} USDT`,
      withdraw_tip: "Las ganancias de referidos se añaden automáticamente a tu billetera.",
      promote: "Comparte tu enlace y gana hasta 40% de comisión.",
    },

    subbot: {
      title: "Administrar Sub-Bot",
      send_token: "Envía el token de tu sub-bot:",
      saved: "Token del sub-bot guardado.",
      menu: "Configuración del Sub-Bot",
      broadcast_basic: "Difusión de texto (Básico)",
      broadcast_pro: "Difusión de medios (VIP)",
      stats: "Estadísticas del Bot",
      buttons: "Administrar Botones",
    },

    supply: {
      title: "Mercado",
      post: "Ingresa el contenido de tu publicación:",
      posted: "Tu publicación ha sido publicada.",
      need_vip_top: "Solo los usuarios VIP pueden fijar publicaciones.",
      all_visible: "Todos los usuarios pueden ver el mercado.",
    },

    ads: {
      title: "Configuración de Anuncios",
      enable: "Activar anuncios",
      disable: "Desactivar anuncios",
      vip_hide: "Los usuarios VIP no ven anuncios.",
    },
  },

  
    // ============================
  //            Português (PT)
  // ============================
  pt: {
    system: {
      error: "Ocorreu um erro. Tente novamente mais tarde.",
      success: "Operação concluída com sucesso.",
      back: "⬅ Voltar",
      saved: "Configurações salvas.",
    },

    welcome: {
      start: "Bem-vindo ao YourMenuBot!\nPor favor, escolha uma função abaixo.",
      bind_required: "Você deve vincular o token do sub-bot antes de continuar.",
    },

    menu: {
      main: "Menu Principal",
      subbot: "🤖 Gerenciar Sub-Bot",
      ai: "💡 Assistente de IA",
      supply: "📢 Mercado",
      wallet: "💰 Carteira",
      referral: "🎁 Centro de Indicações",
      vip: "🔧 Centro VIP",
      lang: "🌍 Idioma",
    },

    lang: {
      choose: "Escolha seu idioma:",
      switched: "Idioma alterado com sucesso.",
    },

    ai: {
      intro: "Aqui você pode fazer qualquer pergunta.",
      limit: "Usuários gratuitos podem usar a IA por apenas 30 minutos por dia. Atualize para VIP para uso ilimitado.",
      ask: "Digite sua pergunta:",
    },

    vip: {
      title: "Planos VIP",
      need_vip: "Esta função requer VIP.",
      purchased: "Seu VIP foi ativado.",
      plans: {
        week: "VIP 7 dias – 5 USDT",
        month: "VIP 30 dias – 15 USDT",
        season: "VIP 90 dias – 38 USDT",
        year: "VIP 365 dias – 158 USDT",
        lifetime: "VIP vitalício – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `Envie USDT (TRC20) para o endereço abaixo:\n\`${addr}\`\n\nApós o pagamento, envie:\n\n*pay TXID*`,
      invalid_tx: "Transação não encontrada. Verifique o TXID.",
      vip_extended: "Seu VIP foi renovado.",
    },

    wallet: {
      title: "Carteira",
      balance: (amt: number) => `Seu saldo: ${amt} USDT`,
      deposit: {
        title: "Depositar USDT",
        tip: (addr: string) =>
          `Envie USDT (TRC20) para o endereço:\n\`${addr}\`\n\nQuando finalizar, envie:\n\n*pay TXID*`,
      },
      withdraw: {
        title: "Saque",
        ask_addr: "Digite seu endereço TRC20:",
        ask_amount: "Digite o valor do saque:",
        submitted: "Seu pedido de saque foi enviado.",
      },
      history: "Histórico de Transações",
    },

    referral: {
      title: "Centro de Indicações",
      your_link: (id: number) =>
        `Seu link de indicação:\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a, b, c) =>
        `Indicações concluídas: ${a}\nCliques: ${b}\nGanhos: ${c} USDT`,
      withdraw_tip: "Os ganhos de indicação serão adicionados automaticamente à sua carteira.",
      promote: "Compartilhe seu link e ganhe até 40% de comissão!",
    },

    subbot: {
      title: "Gerenciar Sub-Bot",
      send_token: "Envie o token do seu sub-bot:",
      saved: "Token salvo com sucesso.",
      menu: "Configurações do Sub-Bot",
      broadcast_basic: "Envio de texto (Básico)",
      broadcast_pro: "Envio de mídia (VIP)",
      stats: "Estatísticas do Bot",
      buttons: "Gerenciar Botões",
    },

    supply: {
      title: "Mercado",
      post: "Digite o conteúdo da nova publicação:",
      posted: "Sua publicação foi enviada.",
      need_vip_top: "Apenas VIP pode fixar publicações.",
      all_visible: "Todos os usuários podem ver as publicações.",
    },

    ads: {
      title: "Configurações de Anúncios",
      enable: "Ativar anúncios",
      disable: "Desativar anúncios",
      vip_hide: "Usuários VIP não veem anúncios.",
    },
  },

    // ============================
  //              Italiano (IT)
  // ============================
  it: {
    system: {
      error: "Si è verificato un errore. Per favore riprova più tardi.",
      success: "Operazione completata con successo.",
      back: "⬅ Indietro",
      saved: "Impostazioni salvate.",
    },

    welcome: {
      start: "Benvenuto su YourMenuBot!\nSeleziona una funzione dal menu qui sotto.",
      bind_required: "Per favore collega il token del tuo sub-bot prima di continuare.",
    },

    menu: {
      main: "Menu Principale",
      subbot: "🤖 Gestione Sub-Bot",
      ai: "💡 Assistente AI",
      supply: "📢 Mercato",
      wallet: "💰 Portafoglio",
      referral: "🎁 Centro Referral",
      vip: "🔧 Centro VIP",
      lang: "🌍 Lingua",
    },

    lang: {
      choose: "Seleziona una lingua:",
      switched: "Lingua cambiata con successo.",
    },

    ai: {
      intro: "Puoi porre qualsiasi domanda qui.",
      limit: "Gli utenti gratuiti possono usare l'AI solo per 30 minuti al giorno. Aggiorna a VIP per utilizzo illimitato.",
      ask: "Inserisci la tua domanda:",
    },

    vip: {
      title: "Piani VIP",
      need_vip: "Questa funzione richiede un abbonamento VIP.",
      purchased: "Il tuo VIP è stato attivato!",
      plans: {
        week: "VIP 7 giorni – 5 USDT",
        month: "VIP 30 giorni – 15 USDT",
        season: "VIP 90 giorni – 38 USDT",
        year: "VIP 365 giorni – 158 USDT",
        lifetime: "VIP a vita – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `Invia USDT (TRC20) al seguente indirizzo:\n\`${addr}\`\n\nDopo il pagamento invia:\n\n*pay TXID*`,
      invalid_tx: "Transazione non trovata. Controlla il TXID.",
      vip_extended: "Il tuo abbonamento VIP è stato esteso.",
    },

    wallet: {
      title: "Portafoglio",
      balance: (amt: number) => `Saldo: ${amt} USDT`,
      deposit: {
        title: "Deposita USDT",
        tip: (addr: string) =>
          `Invia USDT (TRC20) a:\n\`${addr}\`\n\nQuando hai finito, invia:\n\n*pay TXID*`,
      },
      withdraw: {
        title: "Prelievo",
        ask_addr: "Inserisci il tuo indirizzo TRC20:",
        ask_amount: "Inserisci l'importo da prelevare:",
        submitted: "La tua richiesta di prelievo è stata inviata.",
      },
      history: "Storico Transazioni",
    },

    referral: {
      title: "Centro Referral",
      your_link: (id: number) =>
        `Il tuo link referral:\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a, b, c) =>
        `Referral completati: ${a}\nClic: ${b}\nGuadagni: ${c} USDT`,
      withdraw_tip: "I guadagni referral vengono aggiunti automaticamente al portafoglio.",
      promote: "Condividi il link e guadagna fino al 40% di commissioni.",
    },

    subbot: {
      title: "Gestione Sub-Bot",
      send_token: "Invia il token del tuo sub-bot:",
      saved: "Token salvato correttamente.",
      menu: "Impostazioni Sub-Bot",
      broadcast_basic: "Broadcast di testo (Base)",
      broadcast_pro: "Broadcast multimediale (VIP)",
      stats: "Statistiche Bot",
      buttons: "Gestione Bottoni",
    },

    supply: {
      title: "Mercato",
      post: "Inserisci il contenuto dell'annuncio:",
      posted: "Il tuo annuncio è stato pubblicato.",
      need_vip_top: "Solo utenti VIP possono fissare gli annunci.",
      all_visible: "Tutti gli utenti possono vedere il mercato.",
    },

    ads: {
      title: "Gestione Pubblicità",
      enable: "Attiva pubblicità",
      disable: "Disattiva pubblicità",
      vip_hide: "Gli utenti VIP non visualizzano pubblicità.",
    },
  },

    // ============================
  //               Français (FR)
  // ============================
  fr: {
    system: {
      error: "Une erreur est survenue. Veuillez réessayer plus tard.",
      success: "Opération effectuée avec succès.",
      back: "⬅ Retour",
      saved: "Configuration enregistrée.",
    },

    welcome: {
      start: "Bienvenue sur YourMenuBot !\nVeuillez choisir une fonction ci-dessous.",
      bind_required: "Vous devez d'abord lier le token de votre sous-bot.",
    },

    menu: {
      main: "Menu Principal",
      subbot: "🤖 Gérer le Sous-Bot",
      ai: "💡 Assistant IA",
      supply: "📢 Marché",
      wallet: "💰 Portefeuille",
      referral: "🎁 Parrainage",
      vip: "🔧 Centre VIP",
      lang: "🌍 Langue",
    },

    lang: {
      choose: "Choisissez votre langue :",
      switched: "Langue changée avec succès.",
    },

    ai: {
      intro: "Vous pouvez poser n'importe quelle question ici.",
      limit: "Les utilisateurs gratuits peuvent utiliser l'IA pendant 30 minutes par jour. Passez en VIP pour un usage illimité.",
      ask: "Entrez votre question :",
    },

    vip: {
      title: "Plans VIP",
      need_vip: "Cette fonctionnalité nécessite un abonnement VIP.",
      purchased: "Votre VIP a été activé.",
      plans: {
        week: "VIP 7 jours – 5 USDT",
        month: "VIP 30 jours – 15 USDT",
        season: "VIP 90 jours – 38 USDT",
        year: "VIP 365 jours – 158 USDT",
        lifetime: "VIP à vie – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `Envoyez des USDT (TRC20) à l'adresse suivante :\n\`${addr}\`\n\nUne fois le paiement effectué, envoyez :\n\n*pay TXID*`,
      invalid_tx: "Transaction introuvable. Vérifiez le TXID.",
      vip_extended: "Votre abonnement VIP a été prolongé.",
    },

    wallet: {
      title: "Portefeuille",
      balance: (amt: number) => `Solde : ${amt} USDT`,
      deposit: {
        title: "Déposer des USDT",
        tip: (addr: string) =>
          `Envoyez des USDT (TRC20) à l'adresse :\n\`${addr}\`\n\nUne fois terminé, envoyez :\n\n*pay TXID*`,
      },
      withdraw: {
        title: "Retrait",
        ask_addr: "Entrez votre adresse TRC20 :",
        ask_amount: "Entrez le montant à retirer :",
        submitted: "Votre demande de retrait a été envoyée.",
      },
      history: "Historique des Transactions",
    },

    referral: {
      title: "Centre de Parrainage",
      your_link: (id: number) =>
        `Votre lien de parrainage :\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a, b, c) =>
        `Parrainages réussis : ${a}\nClics : ${b}\nGains : ${c} USDT`,
      withdraw_tip: "Les gains de parrainage sont automatiquement ajoutés à votre portefeuille.",
      promote: "Partagez votre lien et gagnez jusqu'à 40% de commission.",
    },

    subbot: {
      title: "Gérer le Sous-Bot",
      send_token: "Envoyez le token de votre sous-bot :",
      saved: "Token enregistré.",
      menu: "Paramètres du Sous-Bot",
      broadcast_basic: "Diffusion texte (Basique)",
      broadcast_pro: "Diffusion média (VIP)",
      stats: "Statistiques du Bot",
      buttons: "Gérer les Boutons",
    },

    supply: {
      title: "Marché",
      post: "Entrez le contenu de votre annonce :",
      posted: "Votre annonce a été publiée.",
      need_vip_top: "Seuls les VIP peuvent mettre en avant leurs annonces.",
      all_visible: "Tous les utilisateurs peuvent voir les annonces.",
    },

    ads: {
      title: "Gestion des Publicités",
      enable: "Activer les publicités",
      disable: "Désactiver les publicités",
      vip_hide: "Les membres VIP ne voient aucune publicité.",
    },
  },

    // ============================
  //               Deutsch (DE)
  // ============================
  de: {
    system: {
      error: "Ein Fehler ist aufgetreten. Bitte versuche es später erneut.",
      success: "Operation erfolgreich abgeschlossen.",
      back: "⬅ Zurück",
      saved: "Einstellungen gespeichert.",
    },

    welcome: {
      start: "Willkommen bei YourMenuBot!\nBitte wähle eine Funktion aus.",
      bind_required: "Bitte verbinde zuerst den Token deines Sub-Bots.",
    },

    menu: {
      main: "Hauptmenü",
      subbot: "🤖 Sub-Bot verwalten",
      ai: "💡 KI-Assistent",
      supply: "📢 Marktplatz",
      wallet: "💰 Wallet",
      referral: "🎁 Empfehlungscenter",
      vip: "🔧 VIP-Bereich",
      lang: "🌍 Sprache",
    },

    lang: {
      choose: "Bitte wähle eine Sprache:",
      switched: "Sprache erfolgreich geändert.",
    },

    ai: {
      intro: "Du kannst hier jede Frage stellen.",
      limit: "Kostenlose Nutzer können die KI nur 30 Minuten pro Tag verwenden. Upgrade auf VIP für unbegrenzte Nutzung.",
      ask: "Gib deine Frage ein:",
    },

    vip: {
      title: "VIP-Pakete",
      need_vip: "Diese Funktion erfordert VIP.",
      purchased: "Dein VIP wurde aktiviert.",
      plans: {
        week: "VIP 7 Tage – 5 USDT",
        month: "VIP 30 Tage – 15 USDT",
        season: "VIP 90 Tage – 38 USDT",
        year: "VIP 365 Tage – 158 USDT",
        lifetime: "Lebenslang VIP – 388 USDT",
      },
      pay_tip: (addr: string) =>
        `Sende USDT (TRC20) an folgende Adresse:\n\`${addr}\`\n\nNach dem Senden gib ein:\n\n*pay TXID*`,
      invalid_tx: "Transaktion nicht gefunden. Bitte TXID überprüfen.",
      vip_extended: "Dein VIP wurde verlängert.",
    },

    wallet: {
      title: "Wallet",
      balance: (amt: number) => `Dein Guthaben: ${amt} USDT`,
      deposit: {
        title: "USDT einzahlen",
        tip: (addr: string) =>
          `Sende USDT (TRC20) an:\n\`${addr}\`\n\nWenn du fertig bist, sende:\n\n*pay TXID*`,
      },
      withdraw: {
        title: "Auszahlung",
        ask_addr: "Gib deine TRC20-Adresse ein:",
        ask_amount: "Gib den Auszahlungsbetrag ein:",
        submitted: "Deine Auszahlungsanfrage wurde gesendet.",
      },
      history: "Transaktionsverlauf",
    },

    referral: {
      title: "Empfehlungscenter",
      your_link: (id: number) =>
        `Dein Empfehlungslink:\nhttps://t.me/YourMenuBot?start=${id}`,
      stats: (a, b, c) =>
        `Erfolgreiche Empfehlungen: ${a}\nKlicks: ${b}\nEinnahmen: ${c} USDT`,
      withdraw_tip: "Empfehlungsgewinne werden automatisch deinem Wallet gutgeschrieben.",
      promote: "Teile deinen Link und verdiene bis zu 40% Provision!",
    },

    subbot: {
      title: "Sub-Bot Verwaltung",
      send_token: "Sende den Token deines Sub-Bots:",
      saved: "Token erfolgreich gespeichert.",
      menu: "Sub-Bot Einstellungen",
      broadcast_basic: "Text-Broadcast (Basis)",
      broadcast_pro: "Medien-Broadcast (VIP)",
      stats: "Bot-Statistiken",
      buttons: "Buttons verwalten",
    },

    supply: {
      title: "Marktplatz",
      post: "Gib den Inhalt deiner Anzeige ein:",
      posted: "Deine Anzeige wurde veröffentlicht.",
      need_vip_top: "Nur VIP-Benutzer können Anzeigen anheften.",
      all_visible: "Alle Benutzer können den Marktplatz sehen.",
    },

    ads: {
      title: "Werbung verwalten",
      enable: "Werbung aktivieren",
      disable: "Werbung deaktivieren",
      vip_hide: "VIP-Benutzer sehen keine Werbung.",
    },
  },

