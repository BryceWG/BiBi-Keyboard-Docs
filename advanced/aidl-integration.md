# AIDL 通信（小企鹅 / 同文联动）

说点啥（asr-keyboard）提供标准 AIDL 服务，允许其他应用（如[修改版小企鹅输入法](https://github.com/BryceWG/fcitx5-android-bibi-keyboard)、[修改版同文输入法](https://github.com/BryceWG/trime-bibi-keyboard)）调用说点啥的语音识别能力。

服务端为手写 Binder 协议，但与 AIDL 生成的代理完全兼容；客户端可直接使用 `.aidl` 生成的 Stub/Proxy，也可以像小企鹅/同文一样用 `transact` 纯 Binder 调用。

## 用户使用指南

目前支持修改版小企鹅输入法（Fcitx5）与修改版同文输入法（Trime）。通用步骤如下：

1. 下载并安装说点啥最新版（开源版或 Pro 版均可，优先调用 Pro 版）
2. 在说点啥中启用外部联动功能：`设置 → 输入设置 → 允许外部输入法联动（AIDL）`

**Fcitx5（小企鹅）**：

3. 下载并安装修改版小企鹅输入法：<https://github.com/BryceWG/fcitx5-android-bibi-keyboard/releases>
4. 在小企鹅输入法中启用：`设置 → 虚拟键盘 → 空格键长按行为 → 语音输入（AIDL）`
5. 长按空格键开始语音输入，松手结束

**Trime（同文）**：

3. 下载并安装修改版同文输入法：<https://github.com/BryceWG/trime-bibi-keyboard/releases>
4. 在同文输入法中启用：`设置 → 常规设置 → 说点啥 AIDL 语音输入`
5. 使用方式：
   - 长按具备 `VOICE_ASSIST` 功能的按键开始录音，松手结束
   - 如当前主题没有 `VOICE_ASSIST` 长按入口，可在同文设置中开启“工具栏麦克风按钮”，点按开始，再次点按结束并上屏

### 更多外部联动能力

- **剪贴板同步**：最新版修改版 Fcitx5 / Trime 可在各自的剪贴板设置中启用「说点啥粘贴板同步」。说点啥本体也必须已启用并配置剪贴板同步，详见[剪贴板同步](/advanced/clipboard-sync#修改版-fcitx5-trime-配置)。
- **Pro 输入框上下文**：当 Pro 开启「使用输入框上下文辅助」时，修改版输入法会按服务端要求提供光标附近的受限文本，供 AI 后处理参考。
- **Pro 从纠正中学习热词**：当 Pro 开启此功能时，修改版输入法会在语音上屏后短暂观察用户修正，并回报同一输入框中的最终改动。密码、邮箱、网址、电话输入框不会参与。

**包名优先级**（与小企鹅实现一致）：

1. `com.brycewg.asrkb.pro`
2. `com.brycewg.asrkb`

客户端应按顺序尝试绑定，优先使用已安装的 Pro 包（接口与行为一致）。

::: tip 与悬浮球输入法桥接的区别
AIDL 联动适合修改版小企鹅/同文等输入法主动调用说点啥识别能力；IME Bridge 则通过 LSPosed / LSPatch 让说点啥悬浮球把结果交给当前第三方输入法写入。两者可以服务不同场景，普通用户通常只需按所用输入法选择其中一种。详见 [IME Bridge 模块](/advanced/ime-bridge)。
:::

## 开发者指南

### 服务接口（IExternalSpeechService）

**接口描述符**：`com.brycewg.asrkb.aidl.IExternalSpeechService`

事务码（与 AIDL Stub 保持一致）：

| 方法              | 事务码                       | 说明                    |
| ----------------- | ---------------------------- | ----------------------- |
| `startSession`    | `FIRST_CALL_TRANSACTION + 0` | 服务端录音模式会话      |
| `stopSession`     | `FIRST_CALL_TRANSACTION + 1` | 停止当前会话            |
| `cancelSession`   | `FIRST_CALL_TRANSACTION + 2` | 取消当前会话            |
| `isRecording`     | `FIRST_CALL_TRANSACTION + 3` | 指定会话是否正在录音    |
| `isAnyRecording`  | `FIRST_CALL_TRANSACTION + 4` | 是否存在任意录音会话    |
| `getVersion`      | `FIRST_CALL_TRANSACTION + 5` | 获取应用版本名          |
| `startPcmSession` | `FIRST_CALL_TRANSACTION + 6` | 推送 PCM 模式会话       |
| `writePcm`        | `FIRST_CALL_TRANSACTION + 7` | 推送一帧 PCM 音频数据   |
| `finishPcm`       | `FIRST_CALL_TRANSACTION + 8` | 结束 PCM 推送并进入处理 |
| `getInputRequirements` | `FIRST_CALL_TRANSACTION + 9` | 查询可选输入信息（Pro 扩展） |
| `setInputContext` | `FIRST_CALL_TRANSACTION + 10` | 提交受限光标上下文（Pro 扩展） |
| `reportEdit`      | `FIRST_CALL_TRANSACTION + 11` | 回报语音结果修正（Pro 扩展） |

对应 AIDL 方法签名：

```kotlin
fun startSession(config: SpeechConfig?, callback: ISpeechCallback): Int
fun stopSession(sessionId: Int)
fun cancelSession(sessionId: Int)
fun isRecording(sessionId: Int): Boolean
fun isAnyRecording(): Boolean
fun getVersion(): String
fun startPcmSession(config: SpeechConfig?, callback: ISpeechCallback): Int
fun writePcm(sessionId: Int, pcm: ByteArray, sampleRate: Int, channels: Int)
fun finishPcm(sessionId: Int)
fun getInputRequirements(sessionId: Int): Int
fun setInputContext(sessionId: Int, generation: Long, inputType: Int, imeOptions: Int, beforeCursor: String, afterCursor: String): Boolean
fun reportEdit(sessionId: Int, generation: Long, beforeCursor: String, afterCursor: String, reason: String): Boolean
```

### 配置对象（SpeechConfig）

`SpeechConfig` 为可空 Parcelable，字段如下：

- `vendorId: String?`
- `streamingPreferred: Boolean`
- `punctuationEnabled: Boolean?`
- `autoStopOnSilence: Boolean?`
- `sessionTag: String?`

**当前实现说明**：

- `startSession` / `startPcmSession` **均忽略**除 `vendorId=="mock"` 外的全部配置，完全跟随说点啥应用内当前设置。
- 只有 `startSession` 支持 `vendorId=="mock"` 的联通测试模式（见下文）。

### 回调接口（ISpeechCallback）

**接口描述符**：`com.brycewg.asrkb.aidl.ISpeechCallback`

```kotlin
fun onState(sessionId: Int, state: Int, message: String)
fun onPartial(sessionId: Int, text: String)
fun onFinal(sessionId: Int, text: String)
fun onError(sessionId: Int, code: Int, message: String)
fun onAmplitude(sessionId: Int, amplitude: Float)
```

## 主要方法

### startSession（服务端录音模式）

由说点啥负责录音与上行音频。

**返回值**：

- `>0`：成功启动，返回服务端生成的 `sessionId`
- `-2`：系统忙碌（已有会话正在录音）
- `-3`：功能未启用或引擎未就绪
- `-4`：说点啥缺少 `RECORD_AUDIO` 权限

**回调**：

- `-3`（功能未启用）会先回调 `onError(-1, 403, "feature disabled")`
- `-4`（权限）会先回调 `onError(-1, 401, "record permission denied")`
- `-2/-3(引擎未就绪)` 仅通过返回值提示，不额外回调

::: tip 联通测试（mock）
当 `SpeechConfig.vendorId == "mock"` 时会跳过实际录音：
服务端直接回调 `onPartial("【联通测试中】……")` 与 `onFinal("说点啥外部AIDL联通成功（mock）")`，无需录音权限。
:::

### startPcmSession / writePcm / finishPcm（推送 PCM 模式）

由客户端自行录音，并持续向服务端推送 PCM 数据（小企鹅 bibi 使用该模式）。

**startPcmSession 返回值**：

- `>0`：成功启动并返回 `sessionId`
- `-2`：系统忙碌
- `-3`：功能未启用
- `-5`：当前供应商不支持推送 PCM（unsupported）

**注意**：

- 推送 PCM 模式 **不会检查**说点啥的录音权限；录音权限由客户端自己处理。
- 建议发送 `PCM16LE / 16000Hz / mono`，推荐 200ms 一包；服务端当前不强校验采样率与通道，但不匹配可能导致部分引擎效果异常。
- `finishPcm(sessionId)` 等价于 `stopSession(sessionId)`，表示音频输入结束，等待最终结果。

### 可选输入上下文与修正回报（Pro 4.3.0+）

客户端应在会话启动后调用 `getInputRequirements(sessionId)`，按位判断服务端是否需要附加信息：

| 位 | 值 | 含义 |
|----|----|------|
| bit 0 | `1` | AI 后处理需要输入框上下文 |
| bit 1 | `2` | 从纠正中学习热词需要观察识别后的修正 |

当返回值非 `0` 时，客户端可调用 `setInputContext(...)` 提交当前输入目标的 `generation`、`inputType`、`imeOptions` 与光标前后文本。服务端会拒绝敏感输入框，并把光标两侧文本分别限制在 1500 字符内。

若 bit 1 生效，客户端可在最终结果上屏后短暂观察同一输入目标，并通过 `reportEdit(...)` 回报结算快照。服务端只接受同一调用 UID、会话和输入目标的有效回报；学习票据约 90 秒后失效。

::: warning 向后兼容
这三个事务是 Pro 扩展。客户端必须把未知事务或返回 `0` 视为“不需要附加信息”，继续原有 ASR 流程；不要因旧版服务不支持它们而中止录音。
:::

### stopSession / cancelSession

两者均为 `void`，服务端不返回是否成功。

- `stopSession`：结束录音/输入，进入处理阶段（如有），稍后会回 `onFinal` 或 `onError`。
- `cancelSession`：取消并清理会话；不保证不会回 `onFinal`（AIDL 注释为“不可保证产生最终结果”）。

### isRecording / isAnyRecording

- `isRecording(sessionId)`：指定会话是否正在录音/输入中。
- `isAnyRecording()`：是否存在任意活动会话。

### getVersion

返回说点啥的语义化版本名（`BuildConfig.VERSION_NAME`），例如 `"1.6.0"`。

## 回调状态与错误

### onState 的 state 取值

| state(Int) | 说明       | 常见 message       |
| ---------- | ---------- | ------------------ |
| `0`        | Idle/结束  | `final`/`canceled` |
| `1`        | Recording  | `recording`        |
| `2`        | Processing | `processing`       |
| `3`        | Error      | 错误文本           |

### onError 的 code 取值

| code  | 说明                                         |
| ----- | -------------------------------------------- |
| `401` | 说点啥缺少录音权限（仅 startSession 可能回） |
| `403` | 外部联动功能未启用                           |
| `500` | 服务端内部错误（引擎/网络等）                |

## 启用条件

外部 API 联动仅要求：

- `Prefs.externalAidlEnabled == true`

开关入口：`设置 → 输入设置 → 外部输入法联动`。

## 供应商与流式决策

外部调用完全跟随说点啥当前设置（忽略 SpeechConfig）：

**云端供应商**：

- **Volc**：`prefs.volcStreamingEnabled` 决定是否走 `VolcStreamAsrEngine`
- **DashScope**：`prefs.dashStreamingEnabled`
- **Soniox**：`prefs.sonioxStreamingEnabled`
- **ElevenLabs**：`prefs.elevenStreamingEnabled`
- **OpenAI / Gemini / SiliconFlow / Zhipu / OpenRouter / MiMo / StepAudio**：固定非流式文件引擎

**本地供应商**：

- **X-ASR**：固定流式
- **SenseVoice / FunASR Nano / Qwen3-ASR / Parakeet / FireRedASR V2**：固定非流式文件引擎（伪流式仅用于说点啥自身 UI，不暴露给外部）

## 结果过滤

最终结果（`onFinal`）会经过统一末处理：

1. 若开启 `trimFinalTrailingPunct`，去除尾部标点/emoji。
2. 语音预设替换：命中时直接替换为预设文本。
3. 若开启 `postProcessEnabled` 且 LLM 配置有效，则执行 AI 后处理；失败或返回空时回退到简单处理。

统一入口：`AsrFinalFilters.applySimple` / `AsrFinalFilters.applyWithAi`。

## 会话清理

服务端会在以下情况移除会话并释放资源：

- `onFinal` 后
- `onError` 后
- `cancelSession` 调用时立即清理

建议客户端在窗口/焦点变化时主动 `cancelSession`，避免挂起会话。

## 小企鹅输入法（bibi/lexi）集成示例

修改版小企鹅输入法 bibi 已集成说点啥外联（仓库内示例目录仍沿用旧名 `fcitx5-android-lexi-keyboard`）。

**客户端实现文件**：

```
fcitx5-android-lexi-keyboard/app/src/main/java/org/fcitx/fcitx5/android/link/AsrkbSpeechClient.kt
```

**主要特性**：

- 绑定包名顺序：`com.brycewg.asrkb.pro` → `com.brycewg.asrkb`
- 组件名：`com.brycewg.asrkb.api.ExternalSpeechService`
- 纯 Binder `transact` 调用，不依赖 AIDL 生成类
- 使用 **推送 PCM 模式**：`startPcmSession(presence=0)` → 循环 `writePcm` → 松手时 `finishPcm`/`cancelSession`
- 空格键长按开始语音；抬起时若已推送过 PCM 帧则 `finishPcm`，否则 `cancelSession`
- `onPartial` 实时预览（`setComposingText`）
- `onFinal` 提交文本（`commitText`）并解绑服务
- `onAmplitude` 驱动覆盖层波形动画

**错误处理**：

- `-2`：提示“系统忙碌”
- `-3` / `403`：提示“请在说点啥中启用外部联动功能”
- `-5`：提示“当前供应商不支持外部推送 PCM”
- 录音权限由小企鹅侧自行申请；推送 PCM 模式下服务端不会回 `401/-4`

## 使用建议

### 客户端最佳实践

1. 绑定服务时使用 `Context.BIND_AUTO_CREATE`，按 Pro → 开源顺序尝试。
2. `startSession/startPcmSession` 成功后保存返回的 `sessionId`；不要自行生成或复用旧 id。
3. 焦点/窗口切换时主动 `cancelSession(sessionId)`。
4. `onPartial` 用于实时预览；`onFinal`/`onError` 后应解绑或清理资源。
5. 如果希望客户端掌控录音（IME 场景推荐），优先使用推送 PCM 模式。
