# AI Post-processing

AI post-processing uses a Large Language Model (LLM) to refine ASR transcripts. Typical improvements include removing filler words, fixing typos, adjusting punctuation, and polishing tone, making voice typing smoother and more natural.

## Overview

### Pipeline

```
Recording → ASR → [AI post-processing] → Insert text
```

### Recommended use cases

::: tip Good for

- **Speech to writing**: meeting notes, reports
- **Long-form input**: reduce manual edits afterwards
- **Professional content**: more formal/consistent output
- **Multilingual**: combine with translation prompts for cross-language voice input
  :::

::: warning Not recommended

- Casual chat (spoken style may feel more natural)
- Very short input (single word, numbers)
- Latency-sensitive scenarios
  :::

## Supported LLM Providers

BiBi Keyboard supports **11** LLM providers. All of them use an OpenAI-compatible API format:

| Vendor                             | Default model             | Notes                          | Sign-up link                                                  |
| ---------------------------------- | ------------------------- | ------------------------------ | ------------------------------------------------------------- |
| **SF_FREE** (SiliconFlow Free)     | Qwen/Qwen3-8B             | 🆓 free, no config              | https://cloud.siliconflow.cn/i/g8thUcWa                       |
| **DEEPSEEK**                       | deepseek-chat             | 💰 good value; reasoning mode   | https://platform.deepseek.com/                                |
| **ZHIPU**                          | glm-4.6                   | 🇨🇳 China-based; reasoning mode  | https://bigmodel.cn/usercenter/proj-mgmt/apikeys              |
| **MOONSHOT**                       | kimi-k2-0905-preview      | 🧠 long context; reasoning mode | https://platform.moonshot.cn/console/api-keys                 |
| **VOLCENGINE**                     | doubao-seed-1-6-flash     | 🇨🇳 Doubao; reasoning mode       | https://console.volcengine.com/ark                            |
| **OPENAI**                         | gpt-4o-mini               | 🌍 OpenAI                       | https://platform.openai.com/signup                            |
| **GEMINI**                         | gemini-2.0-flash          | 🚀 fast; reasoning supported     | https://aistudio.google.com/apikey                            |
| **GROQ**                           | llama-3.3-70b-versatile   | ⚡ very fast inference           | https://console.groq.com/keys                                 |
| **CEREBRAS**                       | llama-3.3-70b             | ⚡ fast inference                | https://cloud.cerebras.ai/platform                            |
| **OHMYGPT**                        | gpt-4o-mini               | 🔀 multi-vendor relay            | https://x.dogenet.win/i/CXuHm49s                              |
| **CUSTOM**                         | user-defined              | 🛠️ any OpenAI-compatible API    | -                                                             |

::: info Reasoning mode
Some providers expose a "thinking/reasoning" mode. The model reasons before producing output, which can help for complex editing but usually increases latency and token usage.
:::

## Prompt Presets

BiBi Keyboard includes 5 built-in prompt presets and supports custom ones.

### Built-in presets

| Preset name               | Use case        | Effect                                                         |
| ------------------------- | --------------- | -------------------------------------------------------------- |
| **General post-process**  | daily voice input | remove filler words, fix slips, keep original meaning         |
| **Basic polishing**       | formal rewrite  | grammar fixes, punctuation, smoother expression                |
| **Translate to English**  | cross-language  | translate transcript into English                              |
| **Extract key points**    | meeting notes   | extract key info into a bullet list                            |
| **Extract to-dos**        | task tracking   | identify tasks and generate a checklist                         |

### Custom prompts

Go to `Settings → AI Post-processing → Prompt presets`:

1. Tap "Add preset"
2. Write your prompt (role, task, rules, output format, etc.)
3. Save and apply quickly in AI Edit

## Configuration

### Basic

| Key                 | Type      | Default      | Description                                   |
| ------------------ | --------- | ------------ | --------------------------------------------- |
| `postProcessEnabled` | Boolean   | `false`      | master switch                                 |
| `llmVendor`          | LlmVendor | `SF_FREE`    | selected LLM vendor                           |
| `llmEndpoint`        | String    | vendor default | API endpoint (auto for built-in vendors)     |
| `llmApiKey`          | String    | `""`         | API key (not needed for free service)         |
| `llmModel`           | String    | vendor default | model name                                    |
| `llmTemperature`     | Float     | `0.2`        | temperature (0-2; lower = more deterministic) |

### Advanced

| Key                     | Type   | Default | Description                                              |
| ---------------------- | ------ | ------- | -------------------------------------------------------- |
| `postprocSkipUnderChars` | Int    | `0`     | skip AI post-processing if shorter than this (0=disable)  |
| `activePromptId`         | String | `""`    | active prompt preset id                                  |
| `promptPresetsJson`      | String | `""`    | prompt preset list JSON                                  |

::: info Temperature hints

- **0 - 0.3**: highly consistent, good for precise edits
- **0.4 - 0.7**: balanced creativity and stability
- **0.8 - 2.0**: more creative but less stable
  :::

## Quick Setup

### Use free service (recommended)

BiBi Keyboard ships with **SiliconFlow free service**. No API key is required:

1. Open `Settings → AI Post-processing`
2. Enable "AI post-processing"
3. Ensure vendor is **SF_FREE** (default)
4. Pick a prompt preset (recommended: "General post-process")
5. Tap the magic wand button on the keyboard to enable AI post-processing mode
6. Done — transcripts will be refined automatically

::: tip About the free service

- Has a free quota (see SiliconFlow website for details)
- Example models: Qwen/Qwen3-8B, THUDM/GLM-4-9B, etc.
- If you need other models, register on SiliconFlow and use your own API key
  :::

### Configure a paid vendor

Example with DeepSeek:

1. Sign up at https://platform.deepseek.com/
2. Create an API key and add credits
3. In `Settings → AI Post-processing`:
   - Vendor: **DEEPSEEK**
   - API key: paste your key
   - Model: e.g. `deepseek-chat`
   - Temperature: recommended `0.2`
4. Save and test

### Configure a custom vendor

For any OpenAI-compatible API:

1. Vendor: **CUSTOM**
2. Fill in:
   - **Endpoint**: e.g. `https://your-api.com/v1`
   - **API key**
   - **Model**: e.g. `gpt-3.5-turbo`
   - **Temperature**: recommended `0.2`
3. Save and test

::: warning Custom endpoint requirements

- Must be compatible with OpenAI Chat Completions API
- The path is typically `/v1/chat/completions` (the app will append it automatically)
  :::

## Reasoning Mode Support

Different vendors control reasoning mode in different ways:

| Vendor          | Control method | Supported models                     | Notes                                    |
| --------------- | -------------- | ------------------------------------ | ---------------------------------------- |
| **DEEPSEEK**    | model choice   | deepseek-reasoner                    | choose the reasoner model                |
| **MOONSHOT**    | model choice   | kimi-k2-thinking                     | choose the thinking model                |
| **SF_FREE**     | toggle param   | Qwen3 series, DeepSeek-V3.1, etc.    | enable "Reasoning mode" in settings      |
| **GEMINI**      | toggle param   | gemini-2.5-flash+                     | `reasoning_effort` param                 |
| **GROQ**        | toggle param   | qwen3-32b, gpt-oss series            | `reasoning_effort` param                 |
| **CEREBRAS**    | toggle param   | gpt-oss-120b                         | `reasoning_effort` param                 |
| **VOLCENGINE**  | toggle param   | doubao-seed series, deepseek         | `thinking.type` param                    |
| **ZHIPU**       | toggle param   | glm-4.6, glm-4.5 series              | `thinking.type` param                    |
| **OHMYGPT**     | toggle param   | gemini-2.5, claude, gpt-5 series     | `reasoning_effort` param                 |

::: info When to use reasoning mode

- ✅ complex rewrites (technical terms, strict formatting)
- ✅ tasks needing reasoning (e.g. to-do extraction)
- ✅ multi-step transformations (e.g. translate + polish)
- ❌ simple filler-word removal (extra latency without benefit)
  :::

## Tips

There are three ways to trigger AI post-processing:

| Trigger                 | Description                                                                 | Best for |
| ---------------------- | --------------------------------------------------------------------------- | -------- |
| **Auto post-process**  | runs automatically after each voice input                                   | daily use; output is final |
| **AI Edit**            | select text and open AI Edit; choose a prompt preset for the edit           | iterative edits / retrying |
| **Skip short input**   | set a minimum length threshold to skip AI for short phrases                  | avoid overhead on tiny inputs |

## Troubleshooting

### AI post-processing does not run

Checklist:

1. ✅ enabled (`postProcessEnabled = true`)
2. ✅ input length ≥ `postprocSkipUnderChars`
3. ✅ vendor config is valid (API key works if needed)
4. ✅ network works
5. ✅ quota not exhausted

### Output is not as expected

Possible causes:

- Prompt too vague → add constraints and examples
- Temperature too high → reduce to ~0.2
- Model too weak → try a stronger model
- Input too long → might exceed model context limits

### Too slow

Ideas:

1. Switch to faster vendors (Groq, Cerebras)
2. Use smaller models (e.g. Qwen3-8B instead of 235B)
3. Disable reasoning mode
4. Simplify the prompt

## Related

- [Voice Input Basics](./voice-input.md)
- [Keyboard Layout & Buttons](./keyboard-layout.md#ai-edit-panel)

