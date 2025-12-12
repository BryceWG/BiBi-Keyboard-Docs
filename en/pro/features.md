# Pro Features

BiBi Keyboard Pro builds on the OSS version with more advanced capabilities for power users.

## Overview

Pro includes these exclusive features:

- **Offline Traditional Chinese conversion**: convert results to Traditional Chinese automatically
- **Hotwords management**: unified hotword injection across providers to improve recognition for proper nouns
- **Continuous speaking mode**: VAD auto start/stop without manual control
- **Omni-direction cursor sliding**: enhanced cursor control with 4-direction sliding
- **WebDAV auto backup**: cloud sync settings across devices
- **Regex post-processing**: apply regex rules for text post-processing
- **Advanced UI theming**: more color customization options

## Offline Traditional Chinese Conversion <Badge type="warning" text="Pro" />

Automatically converts Simplified Chinese transcripts to Traditional Chinese.

### Highlights

- **Smart conversion**: offline conversion algorithm
- **Seamless**: runs automatically without hurting recognition speed
- **Global**: works for all providers and input scenarios

### How to use

1. Open BiBi Keyboard Pro settings
2. Go to `Settings → Input Settings → Pro features → Convert to Traditional Chinese after recognition`
3. Choose a rule:
   - **Standard**
   - **Taiwan usage**
   - **Hong Kong usage**

::: tip Note
Conversion applies after all other text processing (including AI post-processing), ensuring final output is Traditional Chinese.
:::

## Hotwords Management <Badge type="warning" text="Pro" />

Manage custom hotwords to improve recognition of proper nouns, brand names, names, etc.

### Highlights

- **Multi-provider support**: auto-adapts hotword formats per ASR provider (local models and ElevenLabs are not supported)
- **Inject into AI prompts**: one-tap inject hotwords into selected AI post-processing prompts
- **Unified adaptation**: for providers without native hotword support, hotwords are structured and injected into recognition prompt parameters

### How to use

1. Open BiBi Keyboard Pro settings
2. Go to `Settings → ASR Settings → Result optimization → Hotwords / common mistakes`
3. Add one hotword per line
4. Save to apply

> Avoid too many hotwords. Per-provider limits apply and excessive lists may hurt performance.

### Providers that support hotwords

| Provider     | Support | Max count                                  |
| ----------- | ------- | ------------------------------------------ |
| Volcengine  | ✅      | 100 tokens (bidirectional streaming) / 5000 |
| DashScope   | ✅      | 10000 tokens                               |
| Soniox      | ✅      | 8000 tokens                                |
| SiliconFlow | ✅      | almost unlimited (SenseVoice/TeleSpeech not supported) |
| OpenAI      | ✅      | depends on model                           |
| Gemini      | ✅      | almost unlimited                           |
| GLM ASR     | ✅      | 100                                        |
| ElevenLabs  | ❌      | -                                          |
| Local models| ❌      | -                                          |

## Continuous Speaking Mode <Badge type="warning" text="Pro" />

Based on VAD (Voice Activity Detection): automatically starts on speech and stops on silence.

### Highlights

- **Auto start**: after tapping mic, recording starts when speech is detected
- **Auto stop**: stops when silence is detected and runs recognition
- **Continuous**: multiple rounds without tapping repeatedly
- **Tunable**: configurable silence window and sensitivity

### How to use

1. Open the BiBi Keyboard Pro panel
2. Add the continuous mode button under Settings → Input Settings → Custom action buttons, then toggle it on the keyboard
3. Start speaking
4. Tune VAD parameters:
   - **Silence window**: 0.5-3s (default 1.5s)
   - **Sensitivity**: 1-10 (default 5)

::: warning Notes

- Continuous mode keeps the mic listening longer and increases battery usage.
- In very noisy environments it may false-trigger; consider switching back to press-and-hold.
- It may take a word or two to detect speech and start recording.
  :::

## Omni-direction Cursor Sliding <Badge type="warning" text="Pro" />

Enables omni-direction cursor movement via sliding on the space bar.

### How to use

1. Enable `Settings → Input Settings → Pro features → Cursor sliding mode`
2. On the keyboard, start from the space key area and swipe up to trigger cursor sliding
3. The mic icon turns into four directional arrows
4. Swipe up/down/left/right to move the cursor; the cursor follows your finger position

## WebDAV Auto Backup <Badge type="warning" text="Pro" />

Automatically backs up all settings to WebDAV storage for multi-device sync.

### Highlights

- **Scheduled backup**
- **Multi-device**: restore on another device by signing in with the same account

### How to use

1. Open BiBi Keyboard Pro settings
2. Go to `Settings → Backup`
3. Enable `Auto backup`
4. Fill in WebDAV:
   - **Server URL**: e.g. `https://dav.example.com`
   - **Username**
   - **Password**
   - **Backup interval**
5. Check backup status and last backup time

::: info Note
WebDAV backup content is the same as manual backup. Only one config file is stored on the server.
:::

## Regex Post-processing <Badge type="warning" text="Pro" />

Apply regex rules to recognition results for advanced text transformations.

### Highlights

- **Full Java regex support**
- **Chained rules**: apply multiple rules in order
- **Templates**: built-in matching options

### How to use

1. Open settings
2. Go to `Settings → ASR Settings → Result optimization → Regex post-processing`
3. Enable and tap `Add rule`
4. Fill in:
   - **Pattern**: regex
   - **Replacement**: replacement text (`$1`, `$2`, etc.)
   - **Options**: ignore case, multiline, etc.
5. Save; rules apply sequentially

::: tip Note
Regex post-processing runs after AI post-processing. It is useful for normalizing AI output formats.
:::

## Advanced UI Theming <Badge type="warning" text="Pro" />

On top of Material 3 dynamic color, Pro adds more color customization options.

### What’s included

OSS:

- Material 3 dynamic colors

Pro adds:

- **Built-in theme colors**: pick theme colors independent of system wallpaper

### How to use

1. Open settings
2. Go to `Settings → Other settings → Custom colors`
3. Choose a theme color

::: info Note
Custom colors override Material 3 dynamic colors. Select the first option to restore default behavior.
:::

## Get Pro

Pro is distributed via **Google Play**.

See:

- [Activation](./activation)
- [Comparison](./comparison)

