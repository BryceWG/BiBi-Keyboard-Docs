# Privacy Policy

**Last Updated: 2026-02-23**

## Introduction

BiBi Keyboard is designed with privacy in mind. This page explains what data is processed under different features.

## Core Principles

- We do not upload or store your voice recordings or recognized text on our own servers.
- The app mainly acts as a client. If you configure third-party ASR/LLM providers, data is sent directly to those providers.

## Anonymous Data Collection (Optional, Off by Default)

The app includes an "Anonymous Data Collection" switch (`Settings -> Other Settings`). Data is uploaded only after you enable it.

### 1. Daily anonymous report (when enabled)

Uploaded fields include:

- Anonymous user ID (random UUID)
- App version
- App language
- Report timestamp
- Random minute of day for report scheduling
- Daily aggregates: ASR event count, total audio duration, app start count
- ASR event metadata list (no text content):
  - Event timestamp
  - ASR vendor ID (`vendorId`)
  - Audio duration (`audioMs`)
  - Processing duration (`procMs`)
  - Source (`ime` / `floating` / `external`)
  - Whether AI post-processing was used (`aiProcessed`)
  - Character count (`charCount`)

### 2. Consent status record (when you agree/disagree or toggle)

The app updates an anonymous consent record with:

- Anonymous user ID (random UUID)
- Whether anonymous collection is enabled (`enabled`)
- Install channel (installer package name)
- First seen timestamp (`firstSeen`)
- Android SDK version
- Device model (manufacturer + model)
- App version
- App language
- Record timestamp

## Data We Do Not Collect

- Raw voice recordings
- Full recognition text content
- Regular typed content
- Personal identity data such as phone number/email/account ID

## Data Stored Locally on Your Device

- App settings (including API keys)
- Recognition history (optional)
- Usage statistics (optional)
- Speech presets
- Pending analytics cache (only if anonymous collection is enabled)

## Third-Party Services

When cloud features are used, data is sent directly to providers you configure, such as:

- ASR providers (e.g., Volcengine, OpenAI, Gemini, Soniox, DashScope)
- LLM post-processing providers (OpenAI-compatible APIs you configure)

Each provider has its own privacy policy and data handling terms.

## Other Optional Cloud Features

- Clipboard sync: only when enabled and configured by you
- WebDAV backup: only when enabled and configured by you

## Your Controls

You can always:

- Disable anonymous data collection
- Disable recognition history
- Disable usage statistics
- Uninstall the app to remove local data

## Contact

- GitHub Issues: https://github.com/brycewg/bibi-keyboard/issues
- Email: bryce1577006721@gmail.com
