import { defineConfig } from 'vitepress'

export default defineConfig({
  vite: {
    server: {
      host: '127.0.0.1'
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }]
  ],

  themeConfig: {
    logo: '/icon_new.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/BryceWG/BiBi-Keyboard' }
    ],

    search: {
      provider: 'local'
    }
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '说点啥',
      description: 'AI 驱动的语音输入键盘',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '文档', link: '/getting-started/installation' },
          { text: 'Pro 版', link: '/pro/features' },
          { text: '更新日志', link: 'https://bibi.brycewg.com/changelog.html' },
          { text: '官方网站', link: 'https://bibi.brycewg.com' }
        ],

        sidebar: [
          {
            text: '快速入门',
            collapsed: false,
            items: [
              { text: '安装指南', link: '/getting-started/installation' },
              { text: '首次设置', link: '/getting-started/first-setup' },
              { text: '语音识别供应商配置', link: '/getting-started/asr-providers' }
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
              { text: 'AIDL 通信（小企鹅联动）', link: '/advanced/aidl-integration' },
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

        footer: {
          message: 'Released under the Apache 2.0 License.',
          copyright: 'Copyright © 2024-present Bryce'
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
    },

    en: {
      label: 'English',
      lang: 'en-US',
      title: 'BiBi Keyboard',
      description: 'AI-powered voice input keyboard',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Docs', link: '/en/getting-started/installation' },
          { text: 'Pro', link: '/en/pro/features' },
          { text: 'Changelog', link: 'https://bibi.brycewg.com/changelog.html' },
          { text: 'Official Website', link: 'https://bibi.brycewg.com' }
        ],

        sidebar: [
          {
            text: 'Getting Started',
            collapsed: false,
            items: [
              { text: 'Installation', link: '/en/getting-started/installation' },
              { text: 'First Setup', link: '/en/getting-started/first-setup' },
              { text: 'ASR Providers', link: '/en/getting-started/asr-providers' }
            ]
          },
          {
            text: 'Features',
            collapsed: false,
            items: [
              { text: 'Voice Input Basics', link: '/en/features/voice-input' },
              { text: 'Keyboard Layout & Buttons', link: '/en/features/keyboard-layout' },
              { text: 'Floating Ball', link: '/en/features/floating-ball' },
              { text: 'AI Post-processing', link: '/en/features/ai-postprocess' },
              { text: 'Recording Modes', link: '/en/features/recording-modes' },
              { text: 'Auto-stop on Silence (VAD)', link: '/en/features/vad' },
              { text: 'Gestures', link: '/en/features/gestures' },
              { text: 'Speech Presets', link: '/en/features/speech-presets' }
            ]
          },
          {
            text: 'Advanced',
            collapsed: false,
            items: [
              { text: 'AIDL Integration (Fcitx)', link: '/en/advanced/aidl-integration' },
              { text: 'Clipboard Sync', link: '/en/advanced/clipboard-sync' },
              { text: 'Backup & Restore', link: '/en/advanced/backup-restore' }
            ]
          },
          {
            text: 'Pro',
            collapsed: false,
            items: [
              { text: 'Pro Features', link: '/en/pro/features' },
              { text: 'Activation', link: '/en/pro/activation' },
              { text: 'Comparison', link: '/en/pro/comparison' }
            ]
          },
          {
            text: 'Troubleshooting',
            collapsed: false,
            items: [
              { text: 'FAQ', link: '/en/troubleshooting/faq' }
            ]
          }
        ],

        footer: {
          message: 'Released under the Apache 2.0 License.',
          copyright: 'Copyright © 2024-present Bryce'
        },

        outline: {
          level: [2, 3],
          label: 'On this page'
        },

        docFooter: {
          prev: 'Previous',
          next: 'Next'
        },

        lastUpdated: {
          text: 'Last updated'
        },

        editLink: {
          pattern: 'https://github.com/BryceWG/BiBi-Keyboard/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        }
      }
    }
  }
})
