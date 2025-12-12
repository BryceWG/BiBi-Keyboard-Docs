# Voice Input Basics

The core of BiBi Keyboard is high-quality speech recognition. It supports multiple ASR engines and recognition modes, so you can use voice input in any app.

## How It Works

Voice input has three stages:

1. **Recording**: the app records your voice. Depending on settings, it can auto-stop on silence or stop manually.
2. **Recognition**: audio is sent to an ASR engine (cloud or local) and transcribed into text.
3. **Output**: the transcript can optionally be refined by AI post-processing, then inserted into the current editor.

## Supported ASR Providers

BiBi Keyboard supports **12** ASR providers, grouped into cloud and local:

### Cloud ASR

| Provider                          | Streaming | Duration limit (non-streaming) | Notes                                                                                                 |
| --------------------------------- | --------- | ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| **Volcengine**                    | ✅        | 1 hour                         | New users often get free quota; supports bidirectional streaming                                      |
| **SiliconFlow**                   | ❌        | 20 min                         | Built-in free ASR (SenseVoiceSmall / TeleSpeechASR); supports Qwen3-Omni transcription (own key)     |
| **ElevenLabs**                    | ✅        | 20 min                         | High-accuracy English; supports both file and streaming                                               |
| **OpenAI**                        | ❌        | 20 min                         | Default `gpt-4o-mini-transcribe`; you can use any compatible Audio Transcriptions model               |
| **DashScope (Alibaba)**           | ✅        | 3 min                          | qwen3-asr-flash; supports streaming and non-streaming                                                 |
| **Gemini (Google)**               | ❌        | 4 hours                        | File-based multimodal speech understanding                                                            |
| **Soniox**                        | ✅        | 1 hour                         | Supports multi-language prompts; both streaming and file modes                                         |
| **Zhipu (GLM)**                   | ❌        | 20 min                         | GLM-ASR; supports context prompt parameters                                                            |

### Local ASR (Offline)

| Provider         | Streaming | Duration limit (non-streaming) | Notes                                   |
| ---------------- | --------- | ------------------------------ | --------------------------------------- |
| **SenseVoice**   | Pseudo ¹  | 5 min                          | Based on sherpa-onnx; multilingual      |
| **TeleSpeech**   | Pseudo ¹  | 5 min                          | Based on sherpa-onnx; optimized for CN  |
| **Paraformer**   | ✅        | Unlimited ²                    | Pure local streaming recognition        |
| **Zipformer**    | ✅        | Unlimited ²                    | Pure local streaming recognition        |

::: info Notes
¹ **Pseudo-streaming**: shows partial results based on VAD segmentation, but it is not true real-time streaming.

² Streaming mode has no duration limit (continuous recognition).

The "Duration limit (non-streaming)" here is the app's **single-segment recording cap** used to control segmented recording behavior. It does not represent provider billing limits or total free quota. For example: Volcengine often provides ~20 hours of free quota for new users; SiliconFlow provides a built-in free ASR service with no total duration quota. For other providers, check their consoles for quota/billing.
:::

For more details on supported models, recommended configs and updated quotas, see the [Providers & Models Guide](https://brycewg.notion.site/bibi-keyboard-providers-guide).

## Cloud vs Local

### Advantages of cloud ASR

- **Higher accuracy**: large cloud models often perform better
- **Multilingual**: better for code-switching, dialects, and more languages
- **No maintenance**: no model download; updates are handled by the provider

### Advantages of local ASR

- **Fully offline**: no network required; privacy-friendly
- **Lower latency**: no network transfer
- **No data usage**: good for limited networks
- **No API quota**: no need to worry about API costs and limits

## Streaming vs Non-streaming

### Streaming recognition

**How it works**: upload audio while recording, and get partial results in real time.

**Pros**:

- ✅ real-time feedback
- ✅ no duration limit
- ✅ lower latency

**Supported engines**:

- Cloud: Volcengine, Soniox, DashScope, ElevenLabs
- Local: Paraformer, Zipformer

### Non-streaming recognition (file upload)

**How it works**: upload the whole audio file after recording stops.

**Pros**:

- ✅ potentially higher quality (global analysis on full audio)
- ✅ simpler and stable
- ✅ supports more providers

**Cons**:

- ⚠️ duration limit (see tables above)
- ⚠️ recognition starts only after recording stops

::: tip Suggestions

- For providers that support both modes, switch under `Settings → ASR Settings → [Provider Settings]`.
- Streaming is great for long recordings and low-latency feedback.
- File mode is great for short audio when accuracy matters more.
  :::

## Segmented Recording

For non-streaming engines, if a recording exceeds the app's single-segment limit for that provider, BiBi Keyboard automatically performs **segmented recording**.

### How it works

1. **Auto split**: near the limit, the current segment is cut and a new segment starts
2. **Background upload**: segments are uploaded/recognized in background while recording continues
3. **Seamless UX**: UI stays in recording state without noticeable interruption
4. **Merge results**: transcripts from segments are concatenated automatically

### Per-provider segment limits (app-side cap)

| Provider     | Segment cap | Notes                                                                 |
| ------------ | ----------- | --------------------------------------------------------------------- |
| Volcengine   | 1 hour      | Official max per request is ~2h; app uses 1h as a safety margin        |
| SiliconFlow  | 20 min      | App default; unrelated to billing/quota                               |
| ElevenLabs   | 20 min      | App default to avoid failures on very long audio                      |
| OpenAI       | 20 min      | App default; tune model/usage as needed                               |
| DashScope    | 3 min       | Default qwen3-asr-flash; app segment cap is 3 min                     |
| Gemini       | 4 hours     | Official max is ~9.5h; app uses 4h as a safety margin                 |
| Soniox       | 1 hour      | No strict official max found; app defaults to 1h                      |
| SenseVoice   | 5 min       | Local performance cap to avoid excessive RAM/time                     |
| TeleSpeech   | 5 min       | Local performance cap to avoid excessive RAM/time                     |

::: warning Notes

- Streaming engines (Paraformer, Zipformer, etc.) have **no duration limit**.
- Segmented recording works only in non-streaming mode.
- Each segment may incur a separate API call cost (for cloud providers).
  :::

## One-tap Setup Options

### 1. Use the free service (recommended for beginners)

No config needed:

1. Open the app; it defaults to **SiliconFlow free service**
2. Under `Settings → ASR Settings → SiliconFlow`, switch between the two free models (`FunAudioLLM/SenseVoiceSmall` and `TeleAI/TeleSpeechASR`)

### 2. Configure a cloud provider

Using Volcengine as an example:

1. Create an account in the [Volcengine console](https://console.volcengine.com/speech/app)
2. Create an app and obtain `App Key` and `Access Key`
3. In BiBi Keyboard, go to `Settings → ASR Settings → Provider` and select **Volcengine**
4. Fill in credentials and save

### 3. Auto-configure local models

1. Download SenseVoice Small from the [model release](https://github.com/BryceWG/BiBi-Keyboard/releases/tag/models)
2. Extract to `Android/data/com.brycewg.asrkb/files/sensevoice/`
3. The app will automatically select **SenseVoice** under `Settings → ASR Settings → Provider`

::: tip Tip
First load of local models may take a few seconds. You can enable "Preload model" (SenseVoice / TeleSpeech / Paraformer / Zipformer all support it) so the model is loaded when the keyboard or floating ball is first shown, reducing the first-recognition latency.
:::

## Related

- [Floating Ball](./floating-ball.md) - voice input anywhere
- [AI Post-processing](./ai-postprocess.md) - refine transcripts with LLM
- [Recording Modes](./recording-modes.md) - press-and-hold vs tap-to-toggle
- [Auto-stop on Silence (VAD)](./vad.md) - stop recording automatically

