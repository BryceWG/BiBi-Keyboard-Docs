# Pro Features

BiBi Keyboard Pro builds on the OSS version with more advanced capabilities for power users.

## Overview

Pro includes these exclusive features:

- **Offline Traditional Chinese conversion**: convert results to Traditional Chinese automatically
- **Hotwords management**: unified hotword injection across providers to improve recognition for proper nouns
- **Hotword stats**: view trigger frequency and hit stats to keep improving your hotword list
- **AI Assistant**: trigger voice commands with wake words, preset keywords, and fuzzy matching
- **App-specific prompts**: automatically switch AI prompt preset by foreground app
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
- **Smart injection into post-processing prompts**: when injecting into AI post-processing, relevant hotwords are dynamically filtered with phoneme-based matching
- **Unified adaptation**: for providers without native hotword support, hotwords are structured and injected into recognition prompt parameters
- **Hotword stats**: view trigger frequency and hit stats to iteratively tune your hotword list
- **Linked with AI Assistant**: AI Assistant keywords can be auto-synced into the hotword list to reduce duplicate maintenance

### How to use

1. Open BiBi Keyboard Pro settings
2. Go to `Settings → ASR Settings → Result Optimization (Pro)`
3. Add/import hotwords (supports batch import from clipboard)
4. Save to apply
5. Open the hotword management page to review trigger frequency/hit stats and refine your list based on results

> Avoid too many hotwords. Per-provider limits apply and excessive lists may hurt performance.

### What’s new (more convenient)

- **Clear all + undo**: clear your hotwords in one tap, with an "Undo" action in the snackbar
- **Add from selection menu**: select any text in any app, then choose "Add hotword to BiBi Keyboard" to add it instantly

### Providers that support hotwords

| Provider     | Support | Max count                                              |
| ------------ | ------- | ------------------------------------------------------ |
| Volcengine   | ✅      | 100 tokens (bidirectional streaming) / 5000            |
| DashScope    | ✅      | 10000 tokens                                           |
| Soniox       | ✅      | 8000 tokens                                            |
| SiliconFlow  | ✅      | almost unlimited (SenseVoice/TeleSpeech not supported) |
| OpenAI       | ✅      | depends on model                                       |
| Gemini       | ✅      | almost unlimited                                       |
| GLM ASR      | ✅      | 100                                                    |
| ElevenLabs   | ❌      | -                                                      |
| Local models | ❌      | -                                                      |

## AI Assistant <Badge type="warning" text="Pro" />

Trigger voice commands with a wake word, so AI can directly handle translation, writing, editing, summarization, and more.

### Highlights

- **Wake-word trigger**: say the wake word at the beginning of speech to enter AI Assistant flow
- **Preset modes**: enable multiple presets at once (for example translation/writing/editing), then match by keywords
- **Fuzzy matching**: wake words and preset keywords support fuzzy matching to reduce trigger failures caused by minor slips
- **Customizable**: customize wake words, keywords, and prompts

### How to use

1. Open `Settings → AI Post-processing`
2. Enable `AI Assistant (Pro)`
3. Configure wake words and preset keywords
4. Speak in the form of "wake word + command" to trigger (for example: "Dian Dian, translate this into English")

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
- **Templates**: one-tap common templates with auto-filled notes
- **Notes**: notes are for display/management only (do not affect matching)

### How to use

1. Open settings
2. Go to `Settings → ASR Settings → Result Optimization (Pro)`
3. Enable and tap `Add rule` (or use `Templates`)
4. Fill in:
   - **Pattern**: regex
   - **Replacement**: replacement text (`$1`, `$2`, etc.)
   - **Options**: ignore case, multiline, etc.
   - **Note**: a label for list display (does not affect behavior)
5. Save; rules apply sequentially

::: tip Note
Regex post-processing runs after AI post-processing. It is useful for normalizing AI output formats.
:::

## App-specific Prompt <Badge type="warning" text="Pro" />

> This feature is only available in Pro

Assign different AI post-processing prompt presets per app. Example: use "General post-process" for chat apps, "Basic polishing" for notes, and "Extract to-dos" for task tools.

### How to use

1. Open `Settings → AI Post-processing`
2. Tap "App-specific Prompt (Pro)"
3. Enable "App-specific Prompt"
4. Tap "Add app" and select a prompt preset for that app

::: warning Notes
This requires enabling BiBi Keyboard’s accessibility service to detect the foreground app. It does not read your chat content or screen text.
:::

## Advanced UI Theming <Badge type="warning" text="Pro" />

On top of Material 3 dynamic color, Pro adds more color customization options.

### What’s included

OSS:

- Material 3 dynamic colors

Pro adds:

- **Built-in theme colors**: pick theme colors independent of system wallpaper
- **Pure black/white themes**: supports pure black and pure white styles for users who prefer a minimal visual look

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
