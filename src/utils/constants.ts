export const NavBarContents = [
  {
    name: 'Dashboard',
    icon: 'dashboard.svg',
    id: 1,
    route: '/dashboard'
  },
  {
    name: 'Home',
    icon: 'home.svg',
    id: 2,
    route: '/home'
  },
  {
    name: 'Help',
    icon: 'training.svg',
    id: 3,
    route: '/help'
  },
  {
    name: 'Settings',
    icon: 'settings.svg',
    id: 4,
    route: '/settings'
  }
];

export const HomeData = [
  {
    name: 'Detect Language',
    nameType: 'text',
    id: 1,
    isActive: false
  },
  {
    name: 'Chinese',
    nameType: 'text',
    id: 2,
    isActive: false
  },
  {
    name: 'French',
    nameType: 'text',
    id: 3,
    isActive: false
  },
  {
    name: '',
    nameType: 'dropdown',
    id: 4,
    isActive: false
  },
  {
    name: '',
    nameType: 'arrows',
    id: 5,
    isActive: false
  },
  {
    name: 'French',
    nameType: 'text',
    id: 6,
    isActive: false
  },
  {
    name: 'Spanish',
    nameType: 'text',
    id: 7,
    isActive: false
  },
  {
    name: 'Arabic',
    nameType: 'text',
    id: 8,
    isActive: false
  },
  {
    name: '',
    nameType: 'dropdown',
    id: 9,
    isActive: false
  }
];

export const SettingsData = [
  {
    name: 'Profile',
    icon: 'profile.svg',
    selectedIcon: 'on.profile.svg',
    id: 1,
    route: '/settings/profile'
  },
  {
    name: 'Notification',
    icon: 'notifications.svg',
    selectedIcon: 'on.notifications.svg',
    id: 2,
    route: '/settings/notification'
  },
  {
    name: 'Personalization',
    icon: 'personalization.svg',
    selectedIcon: 'on.personalization.svg',
    id: 3,
    route: '/settings/personalization'
  },
  {
    name: 'Audit Log',
    icon: 'log.svg',
    selectedIcon: 'on.settings.svg',
    id: 4,
    route: '/settings/log'
  }
];

export const HomeSubData = [
  {
    name: 'History',
    icon: 'history.svg',
    selectedIcon: 'on.history.svg',
    id: 1,
    isClicked: true
  },
  {
    name: 'Saved',
    icon: 'star.svg',
    selectedIcon: 'on.star.svg',
    id: 2,
    isClicked: false
  }
];

export const UserRoles = [
  {
    id: 0,
    role: 'Station Officer'
  },
  {
    id: 1,
    role: 'Desk Officer'
  },
  {
    id: 2,
    role: 'Admin'
  },
  {
    id: 3,
    role: 'Supervisor'
  }
];

export const EmailNotificationData = [
  {
    name: 'News',
    content: 'New crawled contents from the primary and secondary crawler.'
  },
  {
    name: 'Comments',
    content: 'New crawled contents from the primary and secondary crawler.'
  },
  {
    name: 'System updates',
    content: 'New crawled contents from the primary and secondary crawler.'
  }
];

export const PushNotificationData = [
  {
    name: 'Call Invitations',
    content: 'New crawled contents from the primary and secondary crawler.'
  },
  {
    name: 'Comments',
    content: 'New crawled contents from the primary and secondary crawler.'
  },
  {
    name: 'Chats',
    content: 'New crawled contents from the primary and secondary crawler.'
  }
];

export const LogData = [
  {
    time: '6:20pm',
    action: 'Uploaded documents to SIRP',
    snippet: 'Redesigned Naira: CBN launches Cash Swap Programme for rura',
    id: 1,
    date: '19/10/2023'
  },
  {
    time: '6:20pm',
    action: 'Uploaded documents to SIRP',
    snippet: 'Redesigned Naira: CBN launches Cash Swap Programme for rura',
    id: 1,
    date: '19/10/2023'
  },
  {
    time: '6:20pm',
    action: 'Uploaded documents to SIRP',
    snippet: 'Redesigned Naira: CBN launches Cash Swap Programme for rura',
    id: 1,
    date: '19/10/2023'
  },
  {
    time: '6:20pm',
    action: 'Uploaded documents to SIRP',
    snippet: 'Redesigned Naira: CBN launches Cash Swap Programme for rura',
    id: 1,
    date: '19/10/2023'
  },
  {
    time: '6:20pm',
    action: 'Uploaded documents to SIRP',
    snippet: 'Redesigned Naira: CBN launches Cash Swap Programme for rura',
    id: 1,
    date: '19/10/2023'
  },
  {
    time: '6:20pm',
    action: 'Uploaded documents to SIRP',
    snippet: 'Redesigned Naira: CBN launches Cash Swap Programme for rura',
    id: 1,
    date: '19/10/2023'
  }
];

export const TrainingData = [
  // {
  //   name: "All",
  //   icon: "all.svg",
  //   selectedIcon: "on.all.svg",
  //   id: 1,
  //   route: "/help/all",
  // },
  {
    name: "Fact Checker",
    icon: "checker.svg",
    selectedIcon: "on.checker.svg",
    id: 3,
    route: "/help/checker",
  },
  {
    name: "IRP",
    icon: "irp.svg",
    selectedIcon: "on.irp.svg",
    id: 2,
    route: "/help/irp",
  },
  {
    name: "Analyzer",
    icon: "analyzer.svg",
    selectedIcon: "on.analyzer.svg",
    id: 4,
    route: "/help/analyzer",
  },
  {
    name: "Summarizer",
    icon: "summarizer.svg",
    selectedIcon: "on.summarizer.svg",
    id: 5,
    route: "/help/summarizer",
  },
  {
    name: "Collab Workspace",
    icon: "collab.svg",
    selectedIcon: "on.collab.svg",
    id: 6,
    route: "/help/workspace",
  },
  {
    name: "Translator",
    icon: "translator.svg",
    selectedIcon: "on.translator.svg",
    id: 7,
    route: "/help/translator",
  },
  {
    name: "Interrogator",
    icon: "interrogator.svg",
    selectedIcon: "on.interrogator.svg",
    id: 8,
    route: "/help/interrogator",
  },
  {
    name: "FAQ",
    icon: "all.svg",
    selectedIcon: "on.all.svg",
    id: 1,
    route: "/help/faq",
  },
];

export const QuickSearch = [
  'What is crawler',
  'How to use fact checker',
  'What is fact checker',
  'How does fact checker work',
  'Permission for fact checker'
];

export const FAQS = [
  'What is crawler',
  'How to use Fact checker',
  'How does fact checker work',
  'Exporting from fact checker'
];
export const CardData = [
  {
    title:
      "Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri?",
    tag: "nature",
    // image: null,
    video: null,
  },
  {
    title: "Cityscape",
    tag: "city",
    image: "avatar.jpg",
    video: null,
  },
  {
    title:
      "Delicious Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri?",
    tag: "food",
    // image: null,
    video: null,
  },
  {
    title:
      "Sunset at the Beach Delicious Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa",
    tag: "nature",
    image: "avatar.jpg",
    // video: null,
  },
  {
    title:
      "Adventure Time Delicious Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa",
    tag: "travel",
    // image: null,
    video: "travel_video1.mp4",
  },
  {
    title:
      "Tech Gadgets Delicious Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa",
    tag: "technology",
    image: "avatar.jpg",
    // video: null,
  },
  {
    title:
      "Artistic Expression Delicious Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa",
    tag: "art",
    image: "avatar.jpg",
    // video: null,
  },
  {
    title:
      "Music Melody Delicious Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa",
    tag: "music",
    // image: null,
    video: "music_video1.mp4",
  },
  {
    title: "Historical Landmark",
    tag: "travel",
    image: "avatar.jpg",
    // video: null,
  },
  {
    title: "Morning Coffee",
    tag: "food",
    image: "avatar.jpg",
    // video: null,
  },
];
