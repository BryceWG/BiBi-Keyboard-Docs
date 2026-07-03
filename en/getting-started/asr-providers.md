# ASR Provider Setup

This page covers how to register, obtain credentials, and configure ASR providers in BiBi Keyboard (说点啥).

## Before you start

- Open `Settings → ASR Settings` and select your ASR provider.
- Cloud providers usually require an `API Key` / `Access Token`.
- Local models require downloading/importing model files (first load may take a few seconds).

::: warning Security
API keys and access tokens are sensitive. Do not share them publicly. If you suspect leakage, revoke the key/token immediately and create a new one.
:::

## Provider overview

| Provider                                                                                   | Type  | Streaming  | Best for                                             |
| ------------------------------------------------------------------------------------------ | ----- | ---------- | ---------------------------------------------------- |
| **Volcengine**                                                                             | Cloud | ✅         | Low-latency, real-time streaming                     |
| **SiliconFlow**                                                                            | Cloud | ❌         | Beginner-friendly, low cost                          |
| **DashScope (Alibaba)**                                                                    | Cloud | ✅         | Balanced accuracy and cost                           |
| **Soniox**                                                                                 | Cloud | ✅         | Stable streaming, international usage                |
| **Gemini**                                                                                 | Cloud | ❌         | Small usage / file-based recognition                 |
| **ElevenLabs**                                                                             | Cloud | ✅/❌      | High accuracy (model-dependent)                      |
| **OpenAI** (compatible)                                                                    | Cloud | ✅/❌      | OpenAI/compatible file or Realtime transcription     |
| **StepAudio**                                                                              | Cloud | ❌         | StepFun online ASR, Chinese/English and ITN          |
| **Zhipu GLM**                                                                              | Cloud | ❌         | Simple integration, lower cost                       |
| **OpenRouter**                                                                             | Cloud | ❌         | Use an OpenRouter API key with compatible ASR models |
| **MiMo (Xiaomi)**                                                                          | Cloud | ❌         | MiMo v2.5 ASR / audio-understanding models           |
| **Local models** (SenseVoice / FunASR Nano / Qwen3-ASR / Parakeet / FireRedASR V2 / X-ASR) | Local | Partial ✅ | Privacy-first, offline usage                         |

## Volcengine

Volcengine (Doubao Voice) has strong Chinese recognition and supports both streaming and non-streaming.

### 1. Create an app and enable ASR services

1. Open the console: https://console.volcengine.com/speech/app?opt=create
2. Enable these capabilities:
   - `Streaming Speech Recognition Large Model`
   - `Audio File Recognition Large Model (Express)`

![Create app and enable capabilities](/images/getting-started/asr-providers/volcengine-create-app.png)

### 2. Get APP ID and Access Token

1. Open the service page: https://console.volcengine.com/speech/service/10011
2. Copy `APP ID` and `Access Token` under the credential section

![APP ID and Access Token](/images/getting-started/asr-providers/volcengine-credentials.png)

### 3. Configure in BiBi Keyboard

1. Open `Settings → ASR Settings`
2. Select **Volcengine**
3. Paste `APP ID` into `X-Api-App-Key`
4. Paste `Access Token` into `X-Api-Access-Key`
5. If you want streaming, enable “Use Streaming (WebSocket)”

![Configure Volcengine in app](/images/getting-started/asr-providers/volcengine-app-settings.png)

::: tip Note
If you enabled both streaming and audio-file recognition when creating the app, they share the same credentials.
:::

## SiliconFlow

SiliconFlow provides a built-in free ASR option (no key required) and paid models (own key).

### Quick start (no API key required)

1. In `Settings → ASR Settings`, select **SiliconFlow**
2. Keep the “Free ASR” toggles enabled
3. Switch between the free models (e.g. `FunAudioLLM/SenseVoiceSmall`, `TeleAI/TeleSpeechASR`) as needed

### Use your own API key (optional)

1. Sign up / log in: https://cloud.siliconflow.cn/
2. Create an API key in the console
3. Paste it into the SiliconFlow section in BiBi Keyboard

![SiliconFlow API key](/images/getting-started/asr-providers/siliconflow-api-key.png)

## DashScope (Alibaba Bailian / Qwen)

DashScope offers good accuracy and cost efficiency, with partial streaming support.

### 1. Create an API key

1. Open: https://bailian.console.aliyun.com/?tab=model#/api-key
2. Create and copy an API key

![DashScope API key](/images/getting-started/asr-providers/dashscope-api-key.png)

### 2. Configure in BiBi Keyboard

1. Open `Settings → ASR Settings` and select **DashScope**
2. Paste the API key and save
3. Choose a model as needed: `Qwen3-ASR-Flash`, `Qwen3.5-Omni-Flash`, `Qwen3.5-Omni-Plus`, or a streaming model

::: tip Model choice
`Qwen3.5-Omni` is for non-streaming multimodal transcription. Streaming defaults to `qwen3-asr-flash-realtime-2026-02-10`, and you can also switch to `fun-asr-realtime`.
:::

## Soniox

Soniox supports both streaming and non-streaming.

1. Log in: https://console.soniox.com
2. In your project, go to `API keys`
3. Create and copy the API key, then paste it into BiBi Keyboard

![Soniox API keys](/images/getting-started/asr-providers/soniox-nav.png)

### Recognition mode

In Soniox settings, adjust "Endpoint detection sensitivity":

- **Low latency**: faster endpoint detection, best for realtime input
- **Default**: balances latency and accuracy
- **High accuracy**: more sensitive endpoint detection, best for accuracy-sensitive scenarios

## Gemini

Gemini is commonly used for file-based recognition and small usage.

1. Open: https://aistudio.google.com/api-keys
2. Create and copy a key
3. Paste it into the Gemini section in BiBi Keyboard

![Gemini API key](/images/getting-started/asr-providers/gemini-api-key.png)

## ElevenLabs

ElevenLabs `scribe_v1` is non-streaming only; `scribe_v2` is streaming only.

1. Open: https://elevenlabs.io/app/settings/api-keys
2. Create an API key
3. Enable `Speech to Text` permission for the key

![Create ElevenLabs key](/images/getting-started/asr-providers/elevenlabs-create-key.png)
![Enable Speech to Text permission](/images/getting-started/asr-providers/elevenlabs-stt-permission.png)

## OpenAI (compatible endpoints)

The OpenAI provider supports OpenAI-format transcription endpoints, plus compatible third-party Audio Transcriptions, Chat Completions, or Realtime endpoints.

1. In `Settings → ASR Settings`, select **OpenAI**
2. Add one or more OpenAI ASR channels to separate official endpoints, proxy endpoints, or different models
3. Fill in:
   - `ASR Endpoint` (e.g. `https://api.openai.com/v1/audio/transcriptions`, `https://api.openai.com/v1/chat/completions`, or a compatible endpoint)
   - `API Key` (Bearer)
   - `Model name` (e.g. `gpt-4o-mini-transcribe` / `whisper-1`)
4. If the endpoint is a multimodal Chat Completions API, enable `Use Completions API` and optionally fill in a custom prompt
5. If the endpoint supports the Realtime API, enable "Streaming (Realtime)" for live partial results

![OpenAI settings example](/images/getting-started/asr-providers/openai-settings.png)

::: tip Which OpenAI API should I use?
Use `audio/transcriptions` for standard transcription models, `chat/completions` for multimodal models that accept audio input, and Realtime when you need live partial results. You should check the API format with your OpenAI provider.
:::

::: info Custom compatible endpoints
For custom compatible `audio/transcriptions` endpoints, BiBi Keyboard uploads WAV audio to improve compatibility. In this case, "Compress audio before upload" does not apply to that custom OpenAI transcription endpoint.
:::

## OpenRouter

OpenRouter lets BiBi Keyboard call compatible ASR / multimodal transcription models through OpenRouter. It is currently used in non-streaming mode.

1. Create an API key in [OpenRouter Keys](https://openrouter.ai/settings/keys)
2. In `Settings → ASR Settings`, select **OpenRouter**
3. Fill in:
   - `ASR Endpoint` (usually keep the default or use a compatible `/audio/transcriptions` endpoint)
   - `OpenRouter API Key`
   - `Model` (for example `qwen/qwen3-asr-flash-2026-02-10`)
4. Save, then use `Settings Home → Recording Test` to verify the setup

## MiMo (Xiaomi)

MiMo supports `mimo-v2.5-asr` and `mimo-v2.5` audio-understanding models.

1. Prepare a MiMo API key
2. In `Settings → ASR Settings`, select **MiMo**
3. Choose an endpoint preset:
   - Token Plan (Mainland China / Singapore / Europe)
   - Pay-as-you-go
   - Custom endpoint
4. Choose a model and recognition language (Auto / Chinese / English)
5. For the `mimo-v2.5` audio-understanding model, you can fill in a System Prompt; enable "Disable thinking" if you do not need reasoning output

## StepAudio

StepAudio is StepFun's online ASR service. In BiBi Keyboard it is currently used in non-streaming mode.

1. Create an API key in the StepFun console: https://platform.stepfun.com/
2. In `Settings → ASR Settings`, select **StepAudio**
3. Paste the `StepFun API Key`
4. Choose language (Chinese / English / Auto) and enable ITN if needed

## Zhipu GLM

Zhipu GLM is simple to integrate and usually used as non-streaming.

1. Get an API key: https://bigmodel.cn/usercenter/proj-mgmt/apikeys
2. Paste it into the Zhipu section in BiBi Keyboard

## Local model setup

Local models are ideal for offline usage and privacy. Each model trades off speed, quality, and streaming support.

### Model selection tips

- **SenseVoice**: non-streaming; fast and balanced; supports language settings
- **FunASR Nano**: non-streaming; language selection, native ITN, and MLT Nano multilingual variant
- **Qwen3-ASR**: non-streaming; local 0.6B model, good Chinese recognition, optional rule-based ITN
- **Parakeet**: non-streaming; V3 for several European languages, V2 for English
- **FireRedASR V2**: non-streaming / pseudo-streaming; replaces the old TeleSpeech local engine
- **X-ASR**: local streaming; Chinese/English 480ms model with thread count, unload policy, and optional ITN

### Download in-app (recommended)

1. Select a local provider (e.g. SenseVoice / X-ASR)
2. In the model manager, choose a variant and download
3. If notification permission is granted, you can track download/unzip progress in notifications

![Download local models in-app](/images/getting-started/asr-providers/local-models-download.png)

### Import from local files (optional)

If you prefer adding models from local files, download the ZIP first, then choose "Import from local" in the model manager.

### Direct download links (GitHub Releases)

::: info Direct links
The links below point to `BiBi-Keyboard` model ZIPs. If you see 404 or slow downloads, use the models page (Releases: models) or a GitHub mirror site.

- https://github.com/BryceWG/BiBi-Keyboard/releases/tag/models
  :::

#### SenseVoice (non-streaming)

- small-int8 (~153MB): [sherpa-onnx-sense-voice-zh-en-ja-ko-yue-int8-2024-07-17.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-int8-2024-07-17.zip)
- small-fp32 (~980MB): [sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17.zip)

#### X-ASR (streaming)

- Chinese/English 480ms (~530MB): [sherpa-onnx-streaming-x-asr-480ms-zh-en.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-streaming-x-asr-480ms-zh-en.zip)

#### FireRedASR V2 (non-streaming / pseudo-streaming)

- Zh + En CTC int8 (~740MB): [sherpa-onnx-fire-red-asr2-ctc-zh_en-int8-2026-02-25.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-fire-red-asr2-ctc-zh_en-int8-2026-02-25.zip)

#### FunASR Nano (non-streaming)

- int8 (~690MB): [sherpa-onnx-funasr-nano-int8-2025-12-30.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-funasr-nano-int8-2025-12-30.zip)
- MLT Nano int8 (~690MB): [sherpa-onnx-funasr-mlt-nano-int8-2026-03-21.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-funasr-mlt-nano-int8-2026-03-21.zip)

#### Qwen3-ASR (non-streaming)

- 0.6B int8 (~806MB): [sherpa-onnx-qwen3-asr-0.6B-int8-2026-03-25.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-qwen3-asr-0.6B-int8-2026-03-25.zip)

#### Parakeet (non-streaming)

- 0.6B V3 int8 (~456MB): [sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8.zip)
- 0.6B V2 int8 (~451MB): [sherpa-onnx-nemo-parakeet-tdt-0.6b-v2-int8.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-nemo-parakeet-tdt-0.6b-v2-int8.zip)

#### Universal punctuation model (optional)

- int8 (~59MB): [sherpa-onnx-punct-ct-transformer-zh-en-vocab272727-2024-04-12-int8.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-punct-ct-transformer-zh-en-vocab272727-2024-04-12-int8.zip)
