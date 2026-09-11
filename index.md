---
layout: home
title: 「说点啥」使用文档

hero:
  name: 说点啥
  text: BiBi Keyboard
  tagline: 支持 18 个 ASR 供应商，本地离线识别，AI 智能后处理
  image:
    src: /icon_new.svg
    alt: 说点啥 Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /getting-started/installation
    - theme: alt
      text: GitHub
      link: https://github.com/BryceWG/BiBi-Keyboard
    - theme: alt
      text: Telegram 群
      link: https://t.me/+UGFobXqi2bYzMDFl
    - theme: alt
      text: 官方网站
      link: https://bibi.brycewg.com
    - theme: alt
      text: 更新日志
      link: https://bibi.brycewg.com/changelog.html

features:
  - icon: 🎤
    title: 多供应商支持
    details: 支持火山引擎、硅基流动、OpenAI、OpenRouter、MiMo、Cohere、Gemini 等 18 个 ASR 供应商，可随时切换，灵活选择最适合的语音识别服务

  - icon: 🤖
    title: AI 智能后处理
    details: 集成大语言模型对识别结果进行智能优化，支持标点补全、错误纠正、语气优化，让语音输入更加自然流畅

  - icon: 🌐
    title: 本地离线识别
    details: 支持 SenseVoice、FunASR Nano、Qwen3-ASR、Parakeet、FireRedASR V2、X-ASR 等本地模型，无需网络即可使用，保护隐私安全

  - icon: 🎯
    title: 悬浮球输入
    details: 独特的悬浮球功能，在任何键盘上都能使用语音识别，突破键盘限制，享受统一的语音输入体验

  - icon: ⚡
    title: 流式识别
    details: 支持流式实时识别，边说边出字，所见即所得，提供更流畅的语音输入体验

  - icon: 🎨
    title: 优秀 UI 设计
    details: 采用 Miuix 与 Material 3 设计风格，深色模式，界面美观现代，支持动态取色，与系统完美融合

  - icon: 🔧
    title: 高度可定制
    details: 提供丰富的配置选项，录音模式、键盘高度、手势操作、标点按钮等均可自定义，打造专属的语音输入体验

  - icon: 🐧
    title: 小企鹅 / 同文输入法联动
    details: 支持小企鹅（Fcitx）/ 同文（Trime）输入法联动，在对应键盘中进行语音输入
---

## 快速了解

说点啥（BiBi Keyboard）是一款专注于语音输入的 Android 输入法应用，通过集成多家主流 ASR 供应商和本地离线模型，为用户提供高质量的语音识别体验。


### 系统要求

- **Android 版本**：Android 8.0 (API 26) 及以上
- **CPU 架构**：arm64-v8a / armeabi-v7a（部分本地模型不支持 32 位）
- **内存**：本地模型对内存要求较高，低端设备建议选用小体积模型
- **存储空间**：至少 50 MB（使用本地模型需额外 100MB-1GB）
- **网络**：云端 ASR 需要网络连接，本地模型可离线使用

### 开源协议

本项目基于 [Apache License 2.0](https://github.com/BryceWG/BiBi-Keyboard/blob/main/LICENSE) 开源。

### 获取支持

- **GitHub Issues**：[提交问题和建议](https://github.com/BryceWG/BiBi-Keyboard/issues)
- **Telegram 群组**：[加入讨论](https://t.me/+UGFobXqi2bYzMDFl)

### 项目信息

- **开发语言**：Kotlin
- **包名（开源版）**：`com.brycewg.asrkb`
- **包名（Pro 版）**：`com.brycewg.asrkb.pro`
