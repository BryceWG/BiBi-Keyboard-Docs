# AIDL Integration (Fcitx / Trime Linking)

BiBi Keyboard (asr-keyboard) provides a standard AIDL-compatible service, allowing other apps (e.g. the [modified Fcitx5 IME](https://github.com/BryceWG/fcitx5-android-bibi-keyboard) and [modified Trime IME](https://github.com/BryceWG/trime-bibi-keyboard)) to use BiBi Keyboard's speech recognition.

The server side uses a hand-written Binder protocol, but it is fully compatible with AIDL-generated stubs/proxies. Clients can use `.aidl` generated code, or call it via raw Binder `transact` (as Fcitx/Trime do).

## User Guide

Currently supported: modified Fcitx5 and modified Trime. Common steps:

1. Install the latest BiBi Keyboard (OSS or Pro; Pro is preferred if installed)
2. Enable external linking in BiBi Keyboard: `Settings → Input Settings → Allow external IME linking (AIDL)`

**Fcitx5 Android:**

3. Install the modified Fcitx IME: <https://github.com/BryceWG/fcitx5-android-bibi-keyboard/releases>
4. In Fcitx, enable: `Settings → Virtual Keyboard → Long-press Space Bar Behavior → Voice Input (AIDL)`
5. While using Fcitx, long-press Space to start voice input and release to finish

**Trime:**

3. Install the modified Trime IME: <https://github.com/BryceWG/trime-bibi-keyboard/releases>
4. In Trime, enable: `Settings → General Settings → BiBi AIDL Voice Input`
5. Usage:
   - Long-press a key that has `VOICE_ASSIST` to start recording, then release to finish
   - If your current theme has no `VOICE_ASSIST` long-press entry, enable the "Toolbar microphone button" in Trime settings; tap once to start, tap again to stop and commit

**Package priority** (same as Fcitx implementation):

1. `com.brycewg.asrkb.pro`
2. `com.brycewg.asrkb`

Clients should try binding in this order and prefer the installed Pro package (same interface and behavior).

## Developer Guide

### Service interface (IExternalSpeechService)

**Descriptor**: `com.brycewg.asrkb.aidl.IExternalSpeechService`

Transaction codes (match AIDL stub):

| Method            | Transaction code             | Description                      |
| ----------------- | ---------------------------- | -------------------------------- |
| `startSession`    | `FIRST_CALL_TRANSACTION + 0` | server-recording session         |
| `stopSession`     | `FIRST_CALL_TRANSACTION + 1` | stop current session             |
| `cancelSession`   | `FIRST_CALL_TRANSACTION + 2` | cancel current session           |
| `isRecording`     | `FIRST_CALL_TRANSACTION + 3` | whether session is recording     |
| `isAnyRecording`  | `FIRST_CALL_TRANSACTION + 4` | whether any session is recording |
| `getVersion`      | `FIRST_CALL_TRANSACTION + 5` | app version name                 |
| `startPcmSession` | `FIRST_CALL_TRANSACTION + 6` | client-pushed PCM session        |
| `writePcm`        | `FIRST_CALL_TRANSACTION + 7` | push one PCM frame               |
| `finishPcm`       | `FIRST_CALL_TRANSACTION + 8` | finish PCM input and process     |

AIDL signatures:

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
```

### Config object (SpeechConfig)

`SpeechConfig` is a nullable Parcelable with fields:

- `vendorId: String?`
- `streamingPreferred: Boolean`
- `punctuationEnabled: Boolean?`
- `autoStopOnSilence: Boolean?`
- `sessionTag: String?`

**Current behavior**:

- `startSession` / `startPcmSession` ignore all config fields **except** `vendorId == "mock"`. The actual vendor/streaming mode always follows BiBi Keyboard's current in-app settings.
- Only `startSession` supports `vendorId == "mock"` connectivity test mode (see below).

### Callback interface (ISpeechCallback)

**Descriptor**: `com.brycewg.asrkb.aidl.ISpeechCallback`

```kotlin
fun onState(sessionId: Int, state: Int, message: String)
fun onPartial(sessionId: Int, text: String)
fun onFinal(sessionId: Int, text: String)
fun onError(sessionId: Int, code: Int, message: String)
fun onAmplitude(sessionId: Int, amplitude: Float)
```

## Key Methods

### startSession (server-recording)

BiBi Keyboard handles recording and audio upload.

Return values:

- `>0`: success; returns server-generated `sessionId`
- `-2`: busy (an existing session is recording)
- `-3`: feature disabled or engine not ready
- `-4`: BiBi Keyboard lacks `RECORD_AUDIO` permission

Callbacks:

- For feature disabled (`-3`), it will call `onError(-1, 403, "feature disabled")` first.
- For permission (`-4`), it will call `onError(-1, 401, "record permission denied")` first.
- `-2` / `-3` (engine not ready) are indicated only via return value (no extra callback).

::: tip Connectivity test (mock)
When `SpeechConfig.vendorId == "mock"`, it skips real recording:
the server directly calls `onPartial("【testing】...")` and `onFinal("External AIDL integration OK (mock)")` without needing record permission.
:::

### startPcmSession / writePcm / finishPcm (client-pushed PCM)

The client records audio and pushes PCM frames to BiBi Keyboard (Fcitx uses this mode).

`startPcmSession` return values:

- `>0`: success; returns `sessionId`
- `-2`: busy
- `-3`: feature disabled
- `-5`: current vendor does not support pushed PCM (unsupported)

Notes:

- Pushed PCM mode does **not** check BiBi Keyboard's microphone permission; the client handles recording permission itself.
- Recommended format: `PCM16LE / 16000Hz / mono`, around 200ms per frame. The server currently does not strictly validate sample rate/channels, but mismatches may hurt results for some engines.
- `finishPcm(sessionId)` is equivalent to `stopSession(sessionId)` and indicates end of audio input, waiting for final result.

### stopSession / cancelSession

Both are `void`; no success status is returned.

- `stopSession`: end input and enter processing; later you will receive `onFinal` or `onError`.
- `cancelSession`: cancel and cleanup; it is not guaranteed that `onFinal` will never be called (AIDL notes "final result not guaranteed").

### isRecording / isAnyRecording

- `isRecording(sessionId)`: whether the given session is recording/accepting input.
- `isAnyRecording()`: whether any active session exists.

### getVersion

Returns semantic version name (`BuildConfig.VERSION_NAME`), e.g. `"1.6.0"`.

## Callback States & Errors

### onState: state values

| state (Int) | Meaning         | Common message       |
| ----------- | --------------- | -------------------- |
| `0`         | idle / finished | `final` / `canceled` |
| `1`         | recording       | `recording`          |
| `2`         | processing      | `processing`         |
| `3`         | error           | error text           |

### onError: code values

| code  | Meaning                                                     |
| ----- | ----------------------------------------------------------- |
| `401` | missing record permission (only possible from startSession) |
| `403` | external linking is disabled                                |
| `500` | server internal error (engine/network/etc.)                 |

## Enable Requirements

External AIDL linking requires:

- `Prefs.externalAidlEnabled == true`

Settings entry: `Settings → Input Settings → External IME linking`.

## Vendor & Streaming Mode Decision

External calls always follow BiBi Keyboard's current settings (ignore SpeechConfig).

**Cloud vendors**:

- **Volc**: `prefs.volcStreamingEnabled` selects `VolcStreamAsrEngine`
- **DashScope**: `prefs.dashStreamingEnabled`
- **Soniox**: `prefs.sonioxStreamingEnabled`
- **ElevenLabs**: `prefs.elevenStreamingEnabled`
- **OpenAI / Gemini / SiliconFlow / Zhipu / OpenRouter / MiMo / StepAudio**: fixed non-streaming file engines

**Local vendors**:

- **X-ASR**: streaming only
- **SenseVoice / FunASR Nano / Qwen3-ASR / Parakeet / FireRedASR V2**: non-streaming file engines (pseudo-streaming is UI-only and not exposed externally)

## Result Filters

Final results (`onFinal`) go through unified post-filters:

1. If `trimFinalTrailingPunct` is enabled, trim trailing punctuation/emoji.
2. Speech preset replacement: if matched, replace with preset content.
3. If `postProcessEnabled` is enabled and LLM keys are valid, run AI post-processing; on failure/empty output, fall back to simple processing.

Entry points: `AsrFinalFilters.applySimple` / `AsrFinalFilters.applyWithAi`.

## Session Cleanup

Server removes the session and releases resources:

- after `onFinal`
- after `onError`
- immediately on `cancelSession`

Clients should proactively call `cancelSession` on window/focus changes to avoid dangling sessions.

## Fcitx (bibi/lexi) Integration Example

The modified Fcitx IME (bibi) integrates BiBi Keyboard linking. The example directory in this repo still uses the old name `fcitx5-android-lexi-keyboard`.

Client implementation file:

```
fcitx5-android-lexi-keyboard/app/src/main/java/org/fcitx/fcitx5/android/link/AsrkbSpeechClient.kt
```

Key behaviors:

- bind package order: `com.brycewg.asrkb.pro` → `com.brycewg.asrkb`
- component: `com.brycewg.asrkb.api.ExternalSpeechService`
- raw Binder `transact` calls (no AIDL generated classes)
- uses pushed PCM mode: `startPcmSession` → loop `writePcm` → `finishPcm`/`cancelSession`
- long-press Space to start; on release, call `finishPcm` if any PCM was sent, else `cancelSession`
- `onPartial` for preview (`setComposingText`)
- `onFinal` commits (`commitText`) and unbinds service
- `onAmplitude` drives waveform overlay animation

Error handling:

- `-2`: show "busy"
- `-3` / `403`: show "enable external IME linking in BiBi Keyboard"
- `-5`: show "current vendor doesn't support pushed PCM"
- record permission is handled by Fcitx; pushed PCM mode won't return `401/-4` from server

## Best Practices

1. Bind with `Context.BIND_AUTO_CREATE` and try Pro → OSS in order.
2. Store returned `sessionId` after `startSession/startPcmSession`. Do not generate/reuse ids.
3. Call `cancelSession(sessionId)` on focus/window changes.
4. Use `onPartial` for live preview; after `onFinal/onError` you should cleanup/unbind.
5. If you want the client to control recording (recommended for IME use), prefer pushed PCM mode.
