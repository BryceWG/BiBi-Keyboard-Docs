# AI 后处理

AI 后处理功能使用大型语言模型（LLM）对 ASR 识别结果进行智能优化，包括去除语气词、修正错别字、调整标点、改写润色等，让语音输入更加流畅自然。

## 快速配置指南

### 使用免费服务（推荐）

说点啥默认配置了 **SiliconFlow 免费服务**，无需 API Key 即可使用：

1. 进入 `设置 → AI 后处理`
2. 开启"启用 AI 后处理"开关
3. 确认供应商为 **SF_FREE**（默认）
4. 选择 Prompt 预设（推荐"通用后处理"）
5. 在说点啥键盘上点击魔法棒按钮启用 AI 后处理模式
6. 完成！现在语音输入会自动进行 AI 优化

::: tip 免费服务说明

- 有一定免费额度（具体见 SiliconFlow 官网）
- 可选模型：Qwen/Qwen3-8B、THUDM/GLM-4-9B 等
- 如需其他模型，可注册 SiliconFlow 账号领取 14 元赠金并使用自己的 API Key
  :::

### 配置付费供应商

以 DeepSeek 为例：

1. 访问 [DeepSeek 平台](https://platform.deepseek.com/)注册账号
2. 创建 API Key 并充值
3. 在说点啥 `设置 → AI 后处理` 中：
   - 选择供应商：**DEEPSEEK**
   - 填入 API Key
   - 选择模型（如 deepseek-chat）
   - 调整 Temperature（建议 0.2）
4. 保存并测试

### 配置自定义供应商

对于任何 OpenAI 兼容的 API：

1. 在 `设置 → AI 后处理` 中选择供应商：**CUSTOM**
2. 填写完整配置：
   - **端点**：如 `https://your-api.com/v1`
   - **API Key**：您的密钥
   - **模型**：如 `gpt-3.5-turbo`
   - **Temperature**：建议 0.2
3. 保存并测试

::: warning 自定义端点要求

- 必须兼容 OpenAI Chat Completions API 格式
- 端点路径通常为 `/v1/chat/completions`（会自动拼接）
  :::

## 功能说明

### 工作流程

```
语音录音 → ASR 识别 → [AI 后处理] → 提交文本
```

## 流式输出预览与打字机效果

当 LLM 供应商支持流式输出时，AI 后处理会在处理过程中**逐步显示结果预览**（所见即所得）。您可以在 `设置 → AI 后处理` 中开启/关闭「打字机效果」，让预览输出更平滑。

::: info 说明
打字机效果仅影响“流式预览”的展示方式，不影响最终提交到输入框的文本内容。
:::

### 适用场景

::: tip 推荐使用场景

- **口语转书面**：会议记录、报告撰写
- **长文本输入**：减少后期修改工作量
- **专业内容**：需要规范表达的场景
- **多语言**：结合翻译 Prompt 实现语音跨语言输入
  :::

::: warning 不建议场景

- 聊天对话（保持口语化更自然）
- 极短文本（如单个词语、数字）
- 对延迟敏感的场景
  :::

## 支持的 LLM 供应商

说点啥支持 **12 个** LLM 供应商，所有供应商均使用 OpenAI 兼容的 API 格式：

| 供应商                          | 注册链接                                                 |
| ------------------------------- | -------------------------------------------------------- |
| **SF_FREE**<br>硅基流动免费服务 | [立即使用](https://cloud.siliconflow.cn/i/g8thUcWa)      |
| **DEEPSEEK**<br>深度求索        | [注册](https://platform.deepseek.com/)                   |
| **ZHIPU**<br>智谱               | [注册](https://bigmodel.cn/usercenter/proj-mgmt/apikeys) |
| **MOONSHOT**<br>月之暗面        | [注册](https://platform.moonshot.cn/console/api-keys)    |
| **VOLCENGINE**<br>火山引擎      | [注册](https://console.volcengine.com/ark)               |
| **OPENAI**                      | [注册](https://platform.openai.com/signup)               |
| **GEMINI**<br>Google            | [注册](https://aistudio.google.com/apikey)               |
| **GROQ**                        | [注册](https://console.groq.com/keys)                    |
| **CEREBRAS**                    | [注册](https://cloud.cerebras.ai/platform)               |
| **FIREWORKS**                   | [注册](https://fireworks.ai/)                            |
| **OHMYGPT**                     | [注册](https://x.dogenet.win/i/CXuHm49s)                 |
| **CUSTOM**<br>自定义            | -                                                        |

::: info 推理模式（Reasoning Mode）
部分供应商支持"推理模式"切换（Thinking/Reasoning），模型会先进行深度思考再输出结果，适合复杂的文本处理任务。推理模式通常会增加处理时间和 Token 消耗。
:::

## Prompt 预设系统

说点啥内置 5 个常用 Prompt 预设，并支持自定义：

### 内置预设

| 预设名称         | 用途         | 效果                           |
| ---------------- | ------------ | ------------------------------ |
| **通用后处理**   | 日常语音输入 | 去除语气词、修正口误、保持原意 |
| **基础文本润色** | 书面化改写   | 修正语法、添加标点、流畅表达   |
| **翻译为英文**   | 跨语言输入   | 将识别文本翻译为英文           |
| **提取关键要点** | 会议记录     | 提取核心信息为无序列表         |
| **提取待办事项** | 任务管理     | 识别任务项并生成 checklist     |

### 自定义 Prompt

您可以在 `设置 → AI 后处理 → Prompt 预设` 中：

1. 点击"添加预设"创建新 Prompt
2. 编写 Prompt 内容（建议包含角色、任务、规则、输出要求）
3. 保存并在 AI 编辑面板中快速应用

## 配置选项

### 基础配置

| 配置项                      | 类型      | 默认值     | 说明                             |
| --------------------------- | --------- | ---------- | -------------------------------- |
| `postProcessEnabled`        | Boolean   | `false`    | AI 后处理总开关                  |
| `postprocTypewriterEnabled` | Boolean   | `true`     | 流式预览打字机效果（仅影响展示） |
| `llmVendor`                 | LlmVendor | `SF_FREE`  | 当前选择的 LLM 供应商            |
| `llmEndpoint`               | String    | 供应商默认 | API 端点（内置供应商自动设置）   |
| `llmApiKey`                 | String    | `""`       | API 密钥（免费服务无需填写）     |
| `llmModel`                  | String    | 供应商默认 | 使用的模型名称                   |
| `llmTemperature`            | Float     | `0.2`      | 温度参数（0-2，越低越稳定）      |

### 高级配置

| 配置项                   | 类型   | 默认值 | 说明                                 |
| ------------------------ | ------ | ------ | ------------------------------------ |
| `postprocSkipUnderChars` | Int    | `0`    | 少于该字数时跳过 AI 处理（0=不跳过） |
| `activePromptId`         | String | `""`   | 当前活动的 Prompt 预设 ID            |
| `promptPresetsJson`      | String | `""`   | Prompt 预设列表 JSON                 |

::: info Temperature 参数说明

- **0 - 0.3**：输出高度一致，适合精确处理
- **0.4 - 0.7**：平衡创造性与稳定性
- **0.8 - 2.0**：输出更有创造性，但可能不稳定
  :::

## 供应商推理模式支持

部分供应商支持推理模式，通过不同方式控制：

| 供应商         | 推理控制方式 | 支持模型                       | 说明                       |
| -------------- | ------------ | ------------------------------ | -------------------------- |
| **DEEPSEEK**   | 模型选择     | deepseek-reasoner              | 选择 reasoner 模型启用推理 |
| **MOONSHOT**   | 模型选择     | kimi-k2-thinking               | 选择 thinking 模型启用推理 |
| **SF_FREE**    | 参数开关     | Qwen3 系列、DeepSeek-V3.1 等   | 在设置中开启"推理模式"开关 |
| **GEMINI**     | 参数开关     | gemini-2.5-flash 及以上        | reasoning_effort 参数      |
| **GROQ**       | 参数开关     | qwen3-32b、gpt-oss 系列        | reasoning_effort 参数      |
| **CEREBRAS**   | 参数开关     | gpt-oss-120b                   | reasoning_effort 参数      |
| **VOLCENGINE** | 参数开关     | doubao-seed 系列、deepseek     | thinking.type 参数         |
| **ZHIPU**      | 参数开关     | glm-4.6、glm-4.5 系列          | thinking.type 参数         |
| **OHMYGPT**    | 参数开关     | gemini-2.5、claude、gpt-5 系列 | reasoning_effort 参数      |

::: info 推理模式适用场景

- ✅ 复杂文本改写（如专业术语转换）
- ✅ 需要逻辑推理的任务（如提取待办事项）
- ✅ 多步骤处理（如翻译+润色）
- ❌ 简单去除语气词（不需要推理，会增加延迟）
  :::

## 模型选择与获取模型列表

在 `设置 → AI 后处理` 中，您可以通过「获取模型列表」从供应商拉取可用模型，并将常用模型添加到应用内的下拉选择中。

::: tip 提示
对于 **CUSTOM（自定义）** 供应商，如果您的服务端有默认模型，也可以不填写模型名；若测试调用失败，再按服务商要求填写即可。
:::

## 高级：自定义推理参数（JSON）

部分供应商的「推理模式」会提供“推理参数（开启/关闭）”的 JSON 输入框，用于在不同模式下附加高级参数：

- 不确定就留空（使用默认即可）
- 必须是合法 JSON 对象（示例：`{"reasoning_effort":"medium"}`）
- 参数名以各供应商官方文档为准

## 使用技巧

AI 后处理有三种触发方式：

| 触发方式       | 说明                                                                             | 适用场景                 |
| -------------- | -------------------------------------------------------------------------------- | ------------------------ |
| **自动处理**   | 每次语音输入后自动执行                                                           | 日常使用，输出即最终结果 |
| **AI 编辑**    | 手动选择文本，点击键盘左侧的铅笔图标进入编辑面板。点击魔法棒按钮选择应用的提示词 | 需要反复调整或多次尝试   |
| **跳过短文本** | 设置最小字数阈值                                                                 | 避免处理无意义的短语音   |

## 故障排查

### AI 后处理不生效

**检查清单**：

1. ✅ 总开关已启用（`postProcessEnabled = true`）
2. ✅ 输入文本长度 ≥ `postprocSkipUnderChars`
3. ✅ 供应商配置正确（API Key 有效）
4. ✅ 网络连接正常
5. ✅ API 额度未耗尽

### 输出结果不符合预期

**可能原因**：

- Prompt 不够明确 → 添加详细示例
- Temperature 过高 → 降低到 0.2
- 模型选择不当 → 尝试更强大的模型
- 输入文本过长 → 检查是否超出模型上下文限制

### 处理速度慢

**优化方案**：

1. 切换到更快的供应商（Groq、Cerebras）
2. 使用更小的模型（如 Qwen3-8B 而非 Qwen3-235B）
3. 关闭推理模式
4. 简化 Prompt 内容

## 相关功能

- [语音输入基础](./voice-input.md) - 了解 ASR 识别流程
- [键盘布局与按钮](./keyboard-layout.md#ai-编辑面板) - AI 编辑面板入口与按钮说明
