# Floating Ball

The floating ball lets you trigger BiBi Keyboard's voice recognition even when you are using other keyboards, enabling true cross-app voice input.

## Overview

The floating ball is a draggable circular button overlay. It provides:

- **Works with any IME**: use BiBi Keyboard ASR even when a third-party keyboard is active
- **Global**: available in any app (settings, browser, chat apps, etc.)
- **State indicator**: color/animation indicates current status
- **Free positioning**: drag anywhere; auto snap to screen edge
- **Edge semi-hidden handle**: when always visible and resting on an edge, it can collapse to an arrow handle to reduce obstruction
- **Stable across rotation**: remembers edge anchor so portrait/landscape switches keep edge side and relative position as much as possible

## States

| State        | Description                                 |
| ------------ | ------------------------------------------- |
| **Idle**     | waiting; tap/hold to start recording        |
| **Recording**| recording audio with waveform animation     |
| **Processing** | recognizing; spinner while waiting         |
| **Done**     | checkmark; result has been inserted         |

## Settings

Basic options are under `Settings → UI & Interaction → Floating Settings`:

| Key                                  | Type    | Default | Description                                 |
| ------------------------------------ | ------- | ------- | ------------------------------------------- |
| `floatingAsrEnabled`                 | Boolean | `true`  | enable floating ball voice recognition      |
| `floatingSwitcherOnlyWhenImeVisible` | Boolean | `true`  | show only when keyboard is visible          |
| `floatingSwitcherAlpha`              | Float   | `1.0`   | transparency (0.2-1.0)                      |
| `floatingBallSizeDp`                 | Int     | `44`    | size (28-96dp)                              |
| `floatingBallDirectDragEnabled`      | Boolean | `true`  | drag to move without long-press             |
| `floatingWriteTextCompatEnabled`     | Boolean | `true`  | compatibility mode (select-all + paste)     |

### Stability (Optional)

If your device aggressively kills background services and the floating ball/accessibility gets reclaimed, enable keep-alive under `Settings → Other Settings`:

| Key                    | Type    | Default | Description |
| ---------------------- | ------- | ------- | ----------- |
| `floatingKeepAliveEnabled` | Boolean | `false` | keep alive with a foreground service (and request battery whitelist) |
| `floatingKeepAlivePrivilegedEnabled` | Boolean | `false` | enhanced keep-alive via Shizuku / Root (requires foreground keep-alive enabled first) |

- **Foreground keep-alive (recommended first)**: suitable for most users. It shows a persistent notification and improves background survival.
- **Shizuku / Root enhanced keep-alive (advanced)**: for devices that still kill the service even after foreground keep-alive. Prerequisites: foreground keep-alive is already enabled, and Shizuku authorization or a root environment is available.

::: warning Keep-alive risk note
Enhanced keep-alive depends on privileged capabilities (Shizuku or root). Enable it only if your device/security policy allows it. Some systems or enterprise policies may restrict this and it may increase battery usage.
:::

### Details

#### 1. Enable floating ball

- Path: `Settings → UI & Interaction → Floating Settings → Enable voice recognition`
- Description: master switch; when disabled the floating ball is hidden

#### 2. Visibility condition

- Path: `Settings → UI & Interaction → Floating Settings → Only show when keyboard is visible`
- Behavior:
  - On (default): show only when the keyboard panel is visible
  - Off: always show; when keyboard hidden, it becomes semi-transparent and sticks to the edge

#### 3. Transparency

- Range: 0.2 (20%) to 1.0 (opaque)
- Lower values reduce obstruction on screen

#### 4. Size

- Range: 28dp to 96dp
- Default: 44dp

#### 5. Compatibility mode

- Path: `Settings → UI & Interaction → Floating Settings → Write-text compatibility mode`
- Behavior:
  - On (default): uses "Select-all + Paste" strategy for better compatibility
  - Off: uses standard Accessibility APIs (faster, but may not work in some apps)

#### 6. Edge semi-hidden and anchor positioning

- Behavior:
  - After snapping to the left/right edge and staying idle, the floating ball can enter a semi-hidden state and show only an arrow handle; tap or drag the handle to expand quickly
  - On portrait/landscape rotation, it tries to keep the original edge side and relative height to reduce unexpected jumps to center

::: tip About compatibility mode
Accessibility does not provide a true IME-style "insert text" API. Some apps (e.g. WeChat, QQ, some games) may restrict accessibility text input, causing insertion failure. Compatibility mode can mitigate such cases, but it is not perfect.

For best reliability, prefer using the BiBi Keyboard IME, or use Fcitx5 AIDL linking.

You can configure the target package list in Settings (one per line; supports prefix match).
:::

## Permissions

The floating ball requires three system permissions:

### 1. Overlay permission

**Purpose**: show the floating ball over other apps.

**How to grant**:

1. When enabling the feature, the app jumps to system settings
2. Find BiBi Keyboard and allow "Display over other apps"

### 2. Accessibility permission

**Purpose**: insert recognition result into the active editor.

**How to grant**:

1. Settings → Accessibility
2. Enable "BiBi Keyboard speech accessibility service"

::: warning Privacy
BiBi Keyboard's accessibility service is **only used for text insertion**. It does not read screen content or collect sensitive info.
:::

### 3. Microphone permission

**Purpose**: record audio.

**How to grant**:

1. On first use, Android shows a permission prompt
2. Tap "Allow"

## Usage

### Basic

1. **Start recording**:
   - Default: press and hold the floating ball; release to stop
   - Tap mode: tap to start; tap again to stop (enable in settings)
2. **Stop recording**:
   - Hold mode: release finger
   - Tap mode: tap again
3. **Cancel**:
   - Swipe up/left while holding (hold mode)
   - Long-press to cancel (tap mode)

### Advanced

- **Radial menu**: long-press and drag toward the screen center to open the menu; release on a menu item to trigger it. Items include:
  - switch AI post-processing prompt
  - switch ASR provider
  - switch IME
  - toggle VAD
  - view recognition history
  - upload/pull clipboard (requires clipboard sync enabled)
- **Drag**: by default you can drag to move directly. If "Drag to move" is disabled, long-press for ~2s (two vibration feedbacks) to enter move mode
- **Reset**: tap "Reset floating position" in settings

## Common issues

### Floating ball not visible

Possible causes:

1. Overlay permission not granted
2. Master switch off (`floatingAsrEnabled`)
3. "Only show when keyboard is visible" enabled (you need to show keyboard first)
4. System battery optimization/background restrictions kill the app or its accessibility service
   - You can enable "Keep alive with a foreground service" under `Settings → Other Settings`, and request battery whitelist

### Cannot insert text

Possible causes:

1. Accessibility permission not granted
2. The target app blocks accessibility text input → try enabling compatibility mode

## Related

- [Voice Input Basics](./voice-input.md)
- [Recording Modes](./recording-modes.md)
- [AI Post-processing](./ai-postprocess.md)
- [Auto-stop on Silence (VAD)](./vad.md)
