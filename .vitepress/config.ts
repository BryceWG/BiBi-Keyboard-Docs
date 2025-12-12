import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '说点啥',
  description: 'AI 驱动的语音输入键盘',
  lang: 'zh-CN',

  vite: {
    server: {
      host: '127.0.0.1'
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    logo: '/logo.png',

    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/getting-started/installation' },
      { text: 'Pro 版', link: '/pro/features' }
    ],

    sidebar: [
      {
        text: '快速入门',
        collapsed: false,
        items: [
          { text: '安装指南', link: '/getting-started/installation' },
          { text: '首次设置', link: '/getting-started/first-setup' }
        ]
      },
      {
        text: '功能详解',
        collapsed: false,
        items: [
          { text: '语音输入基础', link: '/features/voice-input' },
          { text: '键盘布局与按钮', link: '/features/keyboard-layout' },
          { text: '悬浮球功能', link: '/features/floating-ball' },
          { text: 'AI 后处理', link: '/features/ai-postprocess' },
          { text: '录音模式', link: '/features/recording-modes' },
          { text: '智能静音判停', link: '/features/vad' },
          { text: '手势操作', link: '/features/gestures' },
          { text: '语音预设', link: '/features/speech-presets' }
        ]
      },
      {
        text: '高级功能',
        collapsed: false,
        items: [
          { text: 'AIDL 通信(小企鹅联动)', link: '/advanced/aidl-integration' },
          { text: '剪贴板同步', link: '/advanced/clipboard-sync' },
          { text: '备份与恢复', link: '/advanced/backup-restore' }
        ]
      },
      {
        text: 'Pro 版',
        collapsed: false,
        items: [
          { text: 'Pro 功能介绍', link: '/pro/features' },
          { text: '购买方式', link: '/pro/activation' },
          { text: '版本对比', link: '/pro/comparison' }
        ]
      },
      {
        text: '故障排除',
        collapsed: false,
        items: [
          { text: '常见问题', link: '/troubleshooting/faq' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/BryceWG/BiBi-Keyboard' }
    ],

    footer: {
      message: 'Released under the Apache 2.0 License.',
      copyright: 'Copyright © 2024-present Bryce'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: '页面导航'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    editLink: {
      pattern: 'https://github.com/BryceWG/BiBi-Keyboard/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    }
  }
})
