// export const API_URL = process.env.NODE_ENV === "production" ? "/v1" : "http://localhost:3001/v1";
export const API_URL = 'https://emhoctiengviet.vn:442';
export const TINYMCE_API_KEY = 'gqne3mscqj8poktjz9qp2ywto99mwb9foep7n0pn3v44wl52';
export const practiceTypes = [
  {
    'practiceOrder': 1,
    'title': '0. Tình huống',
    'practiceType': 'situations'
  },
  {
    'practiceOrder': 2,
    'title': '1. Nghe phát âm từ và nhắc lại',
    'practiceType': 'memorizes'
  },
  {
    'practiceOrder': 4,
    'title': '3. Nghe phát âm câu và nhắc lại',
    'practiceType': 'memorizes'
  },
  {
    'practiceOrder': 6,
    'title': '5. Nghe phát âm đoạn thoại và nhắc lại',
    'practiceType': 'memorizes'
  },
  {
    'practiceOrder': 8,
    'title': '7. Nghe và luyện nói theo bài hội thoại',
    'practiceType': 'conversation_memorizes'
  },
  {
    'practiceOrder': 13,
    'title': '12. Làm việc nhóm',
    'practiceType': 'group_exercise'
  },
  {
    'practiceOrder': 14,
    'title': '13. Bài đọc',
    'practiceType': 'writing'
  },
  {
    'practiceOrder': 16,
    'title': '15. Hình ảnh',
    'practiceType': 'culture_image'
  },
  {
    'practiceOrder': 17,
    'title': '16. Bài hát dành cho em',
    'practiceType': 'culture_song'
  },
  {
    'practiceOrder': 18,
    'title': '17. Em đọc thơ',
    'practiceType': 'culture_poem'
  },
  {
    'practiceOrder': 19,
    'title': '18. Thành ngữ - Tục ngữ - Ca dao',
    'practiceType': 'culture_idiom'
  },
  {
    'practiceOrder': 20,
    'title': '19. Thử đoán nào',
    'practiceType': 'culture_quiz'
  },
  {
    'practiceOrder': 21,
    'title': '20. Cùng chơi các bạn ơi',
    'practiceType': 'culture_game'
  }
];

export const languages = [
  {
    'languageCode': 'en',
    'title': 'Tiếng Anh'
  },
  {
    'languageCode': 'cn',
    'title': 'Tiếng Trung'
  },
  {
    'languageCode': 'fr',
    'title': 'Tiếng Pháp'
  },
  {
    'languageCode': 'kr',
    'title': 'Tiếng Hàn'
  },
  {
    'languageCode': 'th',
    'title': 'Tiếng Thái'
  },
  {
    'languageCode': 'de',
    'title': 'Tiếng Đức'
  }
];

export const editorLanguages = [
  {
    'languageCode': 'vi',
    'title': 'Tiếng Việt'
  },
  {
    'languageCode': 'en',
    'title': 'Tiếng Anh'
  },
  {
    'languageCode': 'cn',
    'title': 'Tiếng Trung'
  },
  {
    'languageCode': 'fr',
    'title': 'Tiếng Pháp'
  },
  {
    'languageCode': 'kr',
    'title': 'Tiếng Hàn'
  },
  {
    'languageCode': 'th',
    'title': 'Tiếng Thái'
  },
  {
    'languageCode': 'de',
    'title': 'Tiếng Đức'
  }
];

export const editorTypes = [
  {
    'editorType': 'introduce',
    'title': 'Giới thiệu'
  },
  {
    'editorType': 'guide',
    'title': 'Hướng dẫn'
  },
  {
    'editorType': 'cms-guide',
    'title': 'Tool cms'
  },
  {
    'editorType': 'homepage-title',
    'title': 'Tiêu đề Trang chủ'
  },
  {
    'editorType': 'homepage-authors',
    'title': 'Tác giả Trang chủ'
  },
  {
    'editorType': 'sponsors',
    'title': 'Ds Nhà tài trợ'
  },
];
