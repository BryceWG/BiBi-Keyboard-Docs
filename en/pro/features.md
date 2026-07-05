# Pro Features

BiBi Keyboard Pro builds on the OSS version with more advanced capabilities for power users.

## Overview

Pro includes these exclusive features:

- **Offline Traditional Chinese conversion**: convert results to Traditional Chinese automatically
- **Hotwords management**: provider-aware hotword adaptation to improve recognition for proper nouns
- **Hotword enhanced replacement**: replace similar-sounding fragments with target hotwords via phoneme matching
- **Hotword stats**: view trigger frequency and hit stats to keep improving your hotword list
- **AI Assistant**: trigger voice commands with wake words, preset keywords, and fuzzy matching
- **Input field context**: AI post-processing can reference nearby text around the cursor for better continuity
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

- **Multi-provider support**: auto-adapts hotword formats per ASR provider; selected local models now support hotwords too
- **Before + after recognition**: hotwords first participate in recognition according to provider support; when enhancement is enabled, Pro also runs a pronunciation-similarity fallback after recognition
- **Target word + aliases**: each hotword has up to 3 alias slots. The target word always occupies the first alias slot, and you can add 2 extra aliases
- **Aliases participate in phoneme matching**: both the target word and extra aliases are matched after recognition; matches are replaced with the target word
- **Unified adaptation**: for providers without native hotword support, hotwords are structured and injected into recognition prompt parameters
- **Hotword stats**: view trigger frequency and hit stats to iteratively tune your hotword list
- **Linked with AI Assistant**: AI Assistant keywords can be auto-synced into the hotword list to reduce duplicate maintenance

### How to use

1. Open BiBi Keyboard Pro settings
2. Go to `Settings → ASR Settings → Result Optimization (Pro)`
3. Add/import hotwords (supports batch import from clipboard)
4. Long-press a hotword chip to edit aliases (`target | alias 2 | alias 3`)
5. Enable `Hotword enhanced replacement` if needed
6. Save to apply
7. Open the hotword management page to review trigger frequency/hit stats and refine your list based on results

> Avoid too many hotwords. Per-provider limits apply and excessive lists may hurt performance.

### How it takes effect

| Mode | Before recognition | After recognition |
| ---- | ------------------ | ----------------- |
| Enhanced replacement off | Hotwords participate according to the provider's hotword support; quality depends on the provider | No phoneme fallback replacement |
| Enhanced replacement on | Hotwords still participate according to provider support | Target word and aliases join phoneme matching, then matches are replaced with the target word |

### Alias examples

- **Fix similar-sounding words**: target word `音素`, extra aliases `因素` and `严肃`. If the transcript contains `因素`, it is replaced with `音素`.
- **Shortcut phrase input**: target word `xxxx@qq.com`, extra alias `primary email`. When you say "primary email" and it is recognized, it is replaced with the real email address.

::: warning Suggestion
Enhanced replacement is best for proper nouns and frequent misrecognitions. Adding too many common words may cause unwanted replacements for similar-sounding text.
:::

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
| StepAudio    | ✅      | hotword array only; no extra context injection         |
| OpenAI       | ✅      | depends on model                                       |
| Gemini       | ✅      | almost unlimited                                       |
| GLM ASR      | ✅      | 100                                                    |
| MiMo         | ✅      | supports context injection                             |
| ElevenLabs   | ❌      | -                                                      |
| Qwen3-ASR    | ✅      | suggested limit: 100                                   |
| FunASR Nano  | ✅      | suggested limit: 100                                   |
| Other local models | ❌/depends on engine | depends on engine capability            |

::: info Local hotwords
When using Qwen3-ASR or FunASR Nano, changing hotwords may require the local model to be prepared again before the new list fully takes effect.
:::

## Input Field Context <Badge type="warning" text="Pro" />

When using AI post-processing from the main keyboard, Pro can send text around the cursor as reference to the LLM. This helps the model understand continuity, terminology, and tone. When IME Bridge is enabled, floating-ball recordings can use the current input-field context too.

### How to use

1. Open `Settings → AI Post-processing`
2. Enable `Use input field context (Pro)`
3. Dictate from the main keyboard with AI post-processing enabled. To use it from the floating ball, also enable `Settings → UI & Interaction → Floating Settings → IME bridge mode`

::: warning Privacy
This sends nearby input-field text to the selected LLM provider as reference. Enable it only when you trust that provider and the current content is appropriate to send.
:::

### Scope

Input field context applies to AI post-processing after main-keyboard dictation and to floating-ball dictation when IME Bridge is enabled. MiMo multimodal ASR can also use Pro context information to improve proper nouns and scene-specific terms.

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
2. Add the continuous mode button under `Settings → Input Settings → Custom keyboard layout`, then toggle it on the keyboard
3. Start speaking
4. Tune VAD parameters:
   - **Silence window**: 0.5-3s (default 1.5s)
   - **Sensitivity**: 1-10 (default 5)

The floating ball also supports continuous speaking mode, which is useful for dictating multiple segments in the current app or while using another IME. It keeps listening locally and submits each segment after silence. And you can toggle the switch in the floating ball menu.

::: warning Notes

- Continuous mode keeps the mic listening longer and increases battery usage.
- In very noisy environments it may false-trigger; consider switching back to press-and-hold.
- It may take a word or two to detect speech and start recording; try to use locally captured pre-trigger audio to reduce dropped beginnings.
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
By default, regex post-processing runs after AI post-processing. If you enable "Run regex before AI post-processing", the regex-processed text becomes the AI input, which is useful when you want to clean fixed noise before asking AI to rewrite it.
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
- **AMOLED black mode**: use a deeper black background in dark mode
- **Monet toggle**: choose whether to follow wallpaper dynamic colors
- **Key color customization**: choose default, built-in, or custom colors as the theme seed

### How to use

1. Open settings
2. Go to `Settings → Theme mode (Pro)`
3. Configure:
   - **Appearance**: system / light / dark / AMOLED black
   - **Monet**: whether to use wallpaper dynamic color
   - **Key color**: default, built-in color, or custom color
   - **Color style / spec**: adjust the generated theme palette

::: info Note
Choosing a custom key color overrides pure Material 3 dynamic color behavior. Restore the default key color to return to the default theme behavior.
:::

## Get Pro

Pro is distributed via **Google Play**.

See:

- [Activation](./activation)
- [Comparison](./comparison)
