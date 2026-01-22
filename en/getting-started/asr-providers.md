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

| Provider                                                              | Type  | Streaming  | Best for                              |
| --------------------------------------------------------------------- | ----- | ---------- | ------------------------------------- |
| **Volcengine**                                                        | Cloud | ✅         | Low-latency, real-time streaming      |
| **SiliconFlow**                                                       | Cloud | ❌         | Beginner-friendly, low cost           |
| **DashScope (Alibaba)**                                               | Cloud | ✅         | Balanced accuracy and cost            |
| **Soniox**                                                            | Cloud | ✅         | Stable streaming, international usage |
| **Gemini**                                                            | Cloud | ❌         | Small usage / file-based recognition  |
| **ElevenLabs**                                                        | Cloud | ✅/❌      | High accuracy (model-dependent)       |
| **OpenAI** (compatible)                                               | Cloud | ❌         | OpenAI/compatible file transcription  |
| **Zhipu GLM**                                                         | Cloud | ❌         | Simple integration, lower cost        |
| **Local models** (SenseVoice / Paraformer / FunASR Nano / TeleSpeech) | Local | Partial ✅ | Privacy-first, offline usage          |

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

## Soniox

Soniox supports both streaming and non-streaming.

1. Log in: https://console.soniox.com
2. In your project, go to `API keys`
3. Create and copy the API key, then paste it into BiBi Keyboard

![Soniox API keys](/images/getting-started/asr-providers/soniox-nav.png)

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

The OpenAI provider supports OpenAI-format transcription endpoints (and compatible third-party endpoints).

1. In `Settings → ASR Settings`, select **OpenAI**
2. Fill in:
   - `ASR Endpoint` (e.g. `https://api.openai.com/v1/audio/transcriptions` or a compatible endpoint)
   - `API Key` (Bearer)
   - `Model name` (e.g. `gpt-4o-mini-transcribe` / `whisper-1`)

![OpenAI settings example](/images/getting-started/asr-providers/openai-settings.png)

## Zhipu GLM

Zhipu GLM is simple to integrate and usually used as non-streaming.

1. Get an API key: https://bigmodel.cn/usercenter/proj-mgmt/apikeys
2. Paste it into the Zhipu section in BiBi Keyboard

## Local model setup

Local models are ideal for offline usage and privacy. Each model trades off speed, quality, and streaming support.

### Model selection tips

- **SenseVoice**: non-streaming; fast and balanced; supports language settings
- **FunASR Nano**: non-streaming; slower but often higher quality
- **Paraformer**: streaming supported; decent quality
- **TeleSpeech**: non-streaming; slightly better dialect support

### Download in-app (recommended)

1. Select a local provider (e.g. SenseVoice / Paraformer)
2. In the model manager, choose a variant and download
3. If notification permission is granted, you can track download/unzip progress in notifications

![Download local models in-app](/images/getting-started/asr-providers/local-models-download.png)

### Direct download links (GitHub Releases)

::: info Direct links
The links below point to `BiBi-Keyboard` model ZIPs. If any link returns 404, use the models page:

- https://github.com/BryceWG/BiBi-Keyboard/releases/tag/models
  :::

#### SenseVoice (non-streaming)

- small-int8 (~153MB): [sherpa-onnx-sense-voice-zh-en-ja-ko-yue-int8-2024-07-17.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-int8-2024-07-17.zip)
- small-fp32 (~980MB): [sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17.zip)

#### Paraformer (streaming)

- Trilingual (ZH/Cantonese/EN, ~974MB): [sherpa-onnx-streaming-paraformer-trilingual-zh-cantonese-en.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-streaming-paraformer-trilingual-zh-cantonese-en.zip)
- Bilingual (ZH/EN, ~973MB): [sherpa-onnx-streaming-paraformer-bilingual-zh-en.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-streaming-paraformer-bilingual-zh-en.zip)

#### TeleSpeech (non-streaming)

- int8 (~180MB): [sherpa-onnx-telespeech-ctc-int8-zh-2024-06-04.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-telespeech-ctc-int8-zh-2024-06-04.zip)
- fp32 (~715MB): [sherpa-onnx-telespeech-ctc-zh-2024-06-04.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-telespeech-ctc-zh-2024-06-04.zip)

#### FunASR Nano (non-streaming)

- int8 (~690MB): [sherpa-onnx-funasr-nano-int8-2025-12-30.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-funasr-nano-int8-2025-12-30.zip)

#### Universal punctuation model (optional)

- int8 (~59MB): [sherpa-onnx-punct-ct-transformer-zh-en-vocab272727-2024-04-12-int8.zip](https://github.com/BryceWG/BiBi-Keyboard/releases/download/models/sherpa-onnx-punct-ct-transformer-zh-en-vocab272727-2024-04-12-int8.zip)
