---
layout: home

hero:
  name: BiBi Keyboard
  text: 说点啥
  tagline: 18 ASR providers, local offline recognition, AI post-processing
  actions:
    - theme: brand
      text: Get Started
      link: /en/getting-started/installation
    - theme: alt
      text: GitHub
      link: https://github.com/BryceWG/BiBi-Keyboard
    - theme: alt
      text: Telegram
      link: https://t.me/+UGFobXqi2bYzMDFl
    - theme: alt
      text: Official Website
      link: https://bibi.brycewg.com
    - theme: alt
      text: Changelog
      link: https://bibi.brycewg.com/changelog.html

features:
  - icon: 🎤
    title: Multiple ASR Providers
    details: Supports 18 ASR providers like Volcengine, SiliconFlow, OpenAI, OpenRouter, MiMo, Cohere, Gemini and more. Switch anytime and choose what works best.

  - icon: 🤖
    title: AI Post-processing
    details: Use LLMs to refine transcripts with punctuation, error fixes, and tone polishing for more natural voice typing.

  - icon: 🌐
    title: Local Offline Recognition
    details: Local models including SenseVoice, FunASR Nano, Qwen3-ASR, Parakeet, FireRedASR V2, and X-ASR. Works without network and keeps privacy.

  - icon: 🎯
    title: Floating Ball Voice Input
    details: Use voice recognition anywhere, even on other keyboards, via a floating ball overlay for a unified voice input experience.

  - icon: ⚡
    title: Streaming Recognition
    details: Real-time streaming transcription while you speak for lower latency and better feedback.

  - icon: 🎨
    title: Excellent UI Design
    details: Miuix and Material 3 design style, dark mode, beautiful and modern UI, support dynamic color, blending nicely with the system.

  - icon: 🔧
    title: Highly Customizable
    details: Tune recording modes, keyboard height, gestures, punctuation keys and more to match your workflow.

  - icon: 🐧
    title: Fcitx / Trime Linking
    details: Supports linking with Fcitx (Little Penguin) and Trime input methods via AIDL for voice input inside those keyboards.
---

## Quick Overview

BiBi Keyboard (说点啥) is a voice-first Android IME. It integrates multiple mainstream ASR providers and local offline models to deliver high-quality speech recognition across apps.

### System Requirements

- **Android**: Android 8.0 (API 26) and above
- **CPU ABI**: arm64-v8a / armeabi-v7a (some local models do not support 32-bit)
- **RAM**: local models are memory-hungry; on low-end devices prefer smaller models
- **Storage**: at least 50MB (local models require extra 100MB-1GB)
- **Network**: required for cloud ASR; local models can work offline

### License

This project is open-sourced under [Apache License 2.0](https://github.com/BryceWG/BiBi-Keyboard/blob/main/LICENSE).

### Support

- **GitHub Issues**: https://github.com/BryceWG/BiBi-Keyboard/issues
- **Telegram**: https://t.me/+UGFobXqi2bYzMDFl

### Project Info

- **Language**: Kotlin
- **Package name (OSS)**: `com.brycewg.asrkb`
- **Package name (Pro)**: `com.brycewg.asrkb.pro`
