# Installation

This page explains how to download and install BiBi Keyboard (说点啥).

## System Requirements

Before installing, make sure your device meets the following:

| Item             | Requirement                 |
| ---------------- | --------------------------- |
| **Android**      | Android 10 (API 29) and up  |
| **CPU ABI**      | arm64-v8a (64-bit only)     |
| **Storage**      | at least 50 MB free space   |
| **Network**      | required for cloud ASR      |

::: info About CPU ABI
BiBi Keyboard only provides an arm64-v8a build. 32-bit devices (armeabi-v7a) and x86 are not supported. Most devices released after 2018 support 64-bit.
:::

## Download Channels

### GitHub Releases (Recommended, OSS)

Download the OSS APK from GitHub Releases:

1. Open the [Releases page](https://github.com/BryceWG/BiBi-Keyboard/releases)
2. Find the latest release
3. Download the OSS APK (package name: `com.brycewg.asrkb`) from the assets list

::: tip About the OSS build

- The OSS build includes all core speech recognition features and fits most users.
- Pro is a separate paid app (package: `com.brycewg.asrkb.pro`). It is distributed via Google Play only (no standalone APK download).
  :::

### Google Play (Pro)

If you need Pro features (e.g. continuous speaking mode), search **"BiBi Keyboard Pro"** or **"说点啥 Pro"** on Google Play, or open the [store page](https://play.google.com/store/apps/details?id=com.brycewg.asrkb.pro) to purchase and install.

### Official Website

- https://bibi.brycewg.com

### Telegram

- https://t.me/+UGFobXqi2bYzMDFl

::: warning Note
Telegram is not an official distribution channel. Always download from GitHub Releases (OSS) or Google Play (Pro).
:::

## Installation Steps

### 1. Download the APK

Choose the OSS build and download the APK to your Android device.

### 2. Install the APK

1. Open a file manager and locate the downloaded APK
2. Tap the APK; Android will show an install prompt
3. Tap "Install"
4. Wait for completion and tap "Done"

## Enable the IME

After installation, enable BiBi Keyboard as a system input method:

### 1. Enable the IME

1. Open Settings → System → Languages & input
2. Enable "说点啥" / "BiBi Keyboard"

### 2. Switch to BiBi Keyboard

1. Open the current input method selector
2. Choose "说点啥" / "BiBi Keyboard"

### 3. One-tap Provider Setup

BiBi Keyboard provides one-tap setup options for your first ASR configuration:

1. Open the app
2. A basic tutorial is shown on first launch
3. Choose one of the recommended options:
   - Use SiliconFlow built-in free service (recommended for new users)
   - Configure a cloud provider with your own API key
   - Configure local models (auto-download and use SenseVoice small)
4. Follow the in-app steps

## Grant Required Permissions

On first use, BiBi Keyboard may request the following permissions:

| Permission                                                  | Purpose                                | Required |
| ----------------------------------------------------------- | -------------------------------------- | -------- |
| **RECORD_AUDIO**                                            | capture audio for recognition          | Yes      |
| **INTERNET**                                                | access cloud ASR services              | Cloud ASR only |
| **REQUEST_IGNORE_BATTERY_OPTIMIZATIONS**                    | keep background services running       | Recommended |
| **SYSTEM_ALERT_WINDOW**                                     | show the floating ball                 | Floating ball only |
| **BIND_ACCESSIBILITY_SERVICE**                              | insert results via floating ball       | Floating ball only |
| **POST_NOTIFICATIONS**                                      | show notifications                     | Optional |
| **REQUEST_INSTALL_PACKAGES**                                | install update APKs                    | Optional |

The one-tap setup on the home page can help you complete the key permissions quickly.

## Verify Installation

1. Open any text input field
2. Confirm the current IME is BiBi Keyboard
3. You should see the BiBi Keyboard UI with a microphone button

If everything works, continue to [First Setup](./first-setup).

## Update checks

OSS updates are distributed via GitHub Releases. By default, BiBi Keyboard checks for updates **once per day** when you first open Settings. You can turn it off under `Settings → About → Auto-check for updates`.

## FAQ

### Install failed

**Symptom**: "App not installed" or "There was a problem parsing the package"

**Fix**:

1. Confirm your device supports arm64-v8a
2. Check you have enough free storage

### Permission prompt did not show

**Symptom**: no permission dialog on first launch

**Fix**:

1. Open Settings → Apps → BiBi Keyboard → Permissions
2. Manually grant microphone / overlay / accessibility permissions as needed

## Next

Read [First Setup](./first-setup).
