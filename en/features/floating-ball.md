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

| State          | Description                             |
| -------------- | --------------------------------------- |
| **Idle**       | waiting; tap/hold to start recording    |
| **Recording**  | recording audio with volume glow and peak ripples |
| **Processing** | recognizing; processing animation continues from the recording visual state |
| **Done**       | checkmark; result has been inserted     |

## Settings

Basic options are under `Settings → UI & Interaction → Floating Settings`:

| Key                                  | Type    | Default | Description                             |
| ------------------------------------ | ------- | ------- | --------------------------------------- |
| `floatingAsrEnabled`                 | Boolean | `true`  | enable floating ball voice recognition  |
| `floatingSwitcherOnlyWhenImeVisible` | Boolean | `true`  | show only when keyboard is visible      |
| `floatingSwitcherAlpha`              | Float   | `1.0`   | transparency (0.2-1.0)                  |
| `floatingBallSizeDp`                 | Int     | `44`    | size (28-96dp)                          |
| `floatingBallHoldToRecordEnabled`    | Boolean | `false` | hold to record; release to stop         |
| `floatingBallDirectDragEnabled`      | Boolean | `true`  | drag to move without long-press         |
| `floatingWriteTextCompatEnabled`     | Boolean | `true`  | compatibility mode (select-all + paste) |
| `floatingImeBridgeEnabled`           | Boolean | `false` | IME bridge mode (requires a compatible LSPosed / LSPatch module) |
| `imeBridgePcmRecordingEnabled`       | Boolean | `false` | record by holding inside a compatible bridged IME |

### Stability (Optional)

If your device aggressively kills background services and the floating ball/accessibility gets reclaimed, enable keep-alive under `Settings → Other Settings`:

| Key                                  | Type    | Default | Description                                                                           |
| ------------------------------------ | ------- | ------- | ------------------------------------------------------------------------------------- |
| `floatingKeepAliveEnabled`           | Boolean | `false` | keep alive with a foreground service (and request battery whitelist)                  |
| `floatingKeepAlivePrivilegedEnabled` | Boolean | `false` | enhanced keep-alive via Shizuku / Root (requires foreground keep-alive enabled first) |

- **Foreground keep-alive (recommended first)**: suitable for most users. It shows a persistent notification and improves background survival.
- **Persistent notification status**: after foreground keep-alive is enabled, the notification refreshes basic floating-service status so you can confirm it is still working.
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

#### 5. Floating-ball recording trigger

- Path: `Settings → UI & Interaction → Floating Settings → Hold the floating ball to record`
- Off (default): tap to start, then tap again to stop
- On: hold to start and release to stop. Dragging far enough toward the menu or move direction cancels that recording and performs the corresponding action

#### 6. Compatibility mode

- Path: `Settings → UI & Interaction → Floating Settings → Write-text compatibility mode`
- Behavior:
  - On (default): uses "Select-all + Paste" strategy for better compatibility
  - Off: uses standard Accessibility APIs (faster, but may not work in some apps)

#### 7. IME bridge mode

- Path: `Settings → UI & Interaction → Floating Settings → IME bridge mode`
- Behavior: when the current third-party keyboard has a compatible LSPosed / LSPatch bridge module enabled, final floating-ball recognition text is inserted through that keyboard's own `InputConnection`, and keyboard visibility is reported by the keyboard itself.
- Best for: apps that restrict accessibility insertion, or setups where third-party IME panel visibility should control the floating ball more accurately.

::: warning Advanced option
IME bridge mode requires an additional bridge module. It does not read existing input text. If the bridge is not ready, the floating ball continues using Accessibility insertion or clipboard fallback. See [IME Bridge Module](/en/advanced/ime-bridge) for downloads, LSPosed/LSPatch setup, scope configuration, and troubleshooting.
:::

##### Record inside a bridged IME

After enabling bridge text insertion, you can also enable `Record inside bridged IME`. With an updated compatible LSPosed/LSPatch module, hold the control in the third-party keyboard to record; BiBi Keyboard then recognizes the audio using your current ASR and post-processing settings. See [IME Bridge Module](/en/advanced/ime-bridge#record-inside-a-third-party-ime) for the full procedure.

- In “IME bridge status,” confirm that `PCM` is shown as supported
- Focus a normal text field and keep the third-party keyboard open; sensitive fields are blocked
- If recording fails, it does not automatically switch to the floating ball or BiBi Keyboard's own microphone; trigger it again

#### 8. Edge semi-hidden and anchor positioning

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

::: info Android 14+
On newer Android versions, a microphone foreground-service notification may appear while the floating ball is recording. This is a system requirement for background microphone use and helps keep recording from being interrupted silently.
:::

## Usage

### Basic

1. **Start recording**:
   - Default: tap the floating ball to start; tap again to stop
   - Hold mode: hold to start; release to stop (enable in settings)
2. **Stop recording**:
   - Tap mode: tap again
   - Hold mode: release finger
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

### Continuous speaking with floating ball <Badge type="warning" text="Pro" />

In Pro, continuous speaking mode can also run from the floating ball. When enabled, the floating ball listens locally, starts a segment when VAD detects speech, submits the segment after silence, and then keeps waiting for the next segment.

This is useful when you want continuous dictation in the current app without switching to the BiBi Keyboard panel. It keeps the microphone listening longer than normal hold/tap recording, so battery usage is higher; in noisy environments, switch back to normal recording mode.

## Volume Key Recording

If you prefer physical buttons, you can use volume keys to start or stop voice recognition while the keyboard is visible.

### How to enable

1. Open `Settings → Interface & interaction → More input methods`
2. In "Volume Key Recording Mode", enable "Use volume keys for voice recognition"
3. Choose an action mode:
   - Volume+ starts / stops recording
   - Volume- starts / stops recording
   - Volume+ starts, Volume- stops
   - Volume- starts, Volume+ stops
4. Optionally enable "Recording status reminder" and "Stop recording when keyboard disappears"

::: warning Permission note
Volume key recording uses the Accessibility Service to detect keyboard visibility and volume-key clicks.
:::

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
