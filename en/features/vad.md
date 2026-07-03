# Auto-stop on Silence (VAD)

Auto-stop on silence (Voice Activity Detection, VAD) can stop recording automatically after you stop speaking, so you don't need to tap "stop" manually.

## How it works

BiBi Keyboard uses **Ten VAD (sherpa-onnx)** to detect speech activity in real time:

```
Record → analyze audio in real time → detect speech/silence → accumulate silence time → reach threshold → auto stop
```

Core logic:

1. Analyze audio continuously to detect whether you are speaking
2. Start a timer when silence is detected
3. When silence duration exceeds the configured window (e.g. 1.2s), stop recording
4. Submit audio for recognition automatically

### VAD model

BiBi Keyboard uses **Ten VAD (sherpa-onnx)**, which is:

- low-latency (real-time)
- accurate (better speech vs noise separation)
- fully offline (runs locally)

## Settings

All options are under `Settings → ASR Settings → Auto-stop on silence`:

| Key                         | Type    | Range     | Default  | Description                                 |
| -------------------------- | ------- | --------- | -------- | ------------------------------------------- |
| `recordingAutoStopMode`    | String  | manual / silence / max_duration | `manual` | recording auto-stop mode                    |
| `autoStopOnSilenceEnabled` | Boolean | -         | `false`  | master switch                               |
| `autoStopSilenceWindowMs`  | Int     | 500-3000  | `1200`   | silence window threshold (ms)               |
| `autoStopSilenceSensitivity` | Int   | 1-10      | `4`      | sensitivity (1=conservative, 10=sensitive)  |
| `recordingMaxDurationMs`   | Int     | seconds slider | depends on setting | maximum duration for timeout stop          |
| `skipEmptyAudioEnabled`    | Boolean | -         | `false`  | skip empty audio before non-streaming recognition |
| `autoFilterSilentAudioSegments` | Boolean | -   | `false`  | remove silent parts before non-streaming recognition |

### 1. Recording auto-stop mode

- Key: `recordingAutoStopMode`
- Path: `Settings → ASR Settings → Recording auto-stop`
- Behavior: choose "Manual stop", "Stop on silence", or "Timeout stop". "Stop on silence" uses the VAD parameters on this page; "Timeout stop" uses "Maximum recording duration".

### 2. Enable switch

- Key: `autoStopOnSilenceEnabled`
- Default: off

### 3. Silence window

- Key: `autoStopSilenceWindowMs`
- Range: 500ms - 3000ms
- Default: 1200ms

Suggested presets:

- **Fast**: 800ms (short phrases, chat)
- **Balanced**: 1200ms (default)
- **Relaxed**: 2000ms (long sentences with pauses)

### 4. Sensitivity

- Key: `autoStopSilenceSensitivity`
- Range: 1 - 10
- Default: 4

| Level              | Description                                 | Best for |
| ------------------ | ------------------------------------------- | -------- |
| **1-3 Conservative** | stop only when it is very confident         | noisy environments; quiet voice; frequent pauses |
| **4-6 Balanced**     | balanced accuracy and responsiveness         | daily use |
| **7-10 Sensitive**   | quick response; small pauses may trigger stop | quiet environment; fast input |

### 5. Maximum recording duration

- Key: `recordingMaxDurationMs`
- Path: `Settings → ASR Settings → Recording auto-stop → Timeout stop → Maximum recording duration`
- Behavior: when auto-stop mode is "Timeout stop", recording ends after this duration. It does not use VAD and is useful when you may forget to stop tap-to-toggle recording.

### 6. Empty audio and silent-part filtering

These options affect only non-streaming recognition (file upload or local full-audio inference). They do not change real-time streaming upload.

- **Skip empty audio**: after recording stops, local VAD checks whether the audio contains almost no speech. If it is considered empty, ASR is not called.
- **Auto filter silent parts**: removes long silent parts before recognition to shorten uploaded audio. It is useful for long recordings with obvious pauses.

::: warning Note
Both options are off by default. In noisy environments, with quiet speech, or when you pause for a long time, enable them carefully to avoid skipping or trimming useful speech.
:::

## Suggested configs

### Daily chat

```
autoStopOnSilenceEnabled = true
autoStopSilenceWindowMs = 1000  # 1s
autoStopSilenceSensitivity = 5  # medium-high
```

### Dictation / documents

```
autoStopOnSilenceEnabled = true
autoStopSilenceWindowMs = 1500  # 1.5s
autoStopSilenceSensitivity = 4  # balanced
```

### Meeting notes

```
autoStopOnSilenceEnabled = true
autoStopSilenceWindowMs = 2000  # 2s
autoStopSilenceSensitivity = 3  # conservative
```

## Details

### Detection interval

VAD runs every **96ms**:

```
every 96ms → speech/silence → update silence timer → trigger when threshold reached
```

### Trigger conditions

Auto-stop triggers only when:

1. ✅ enabled (`autoStopOnSilenceEnabled = true`)
2. ✅ VAD model initialized successfully
3. ✅ continuous silence ≥ `autoStopSilenceWindowMs`
4. ✅ currently recording

### Works with all modes

| Recognition mode | VAD auto-stop | Notes |
| --------------- | ------------- | ----- |
| **Streaming**   | ✅            | stops audio stream upload |
| **File mode**   | ✅            | uploads full audio file after stop |
| **Local**       | ✅            | submits audio to local engine |

## Troubleshooting

### VAD does not stop recording

Checklist:

1. ✅ enabled
2. ✅ you paused long enough (pause ≥ window)
3. ✅ environment not too noisy
4. ✅ you are actually recording

Try:

```
autoStopSilenceSensitivity = 6
autoStopSilenceWindowMs = 1000
```

### Stops unexpectedly while speaking

Possible causes:

- long pauses while speaking
- sensitivity too high
- voice too quiet / too far from mic

Try:

```
autoStopSilenceSensitivity = 3
autoStopSilenceWindowMs = 2000
```

### Background noise prevents stopping

If noise is mistaken as speech:

1. move to a quieter environment
2. use a directional mic/noise-canceling headset
3. lower sensitivity:
   ```
   autoStopSilenceSensitivity = 2
   ```
4. or disable VAD temporarily and stop manually

### Feels too slow after you stop speaking

Cause: silence window too long.

Try:

```
autoStopSilenceWindowMs = 800
```

## Related

- [Recording Modes](./recording-modes.md)
- [Voice Input Basics](./voice-input.md)
- [Floating Ball](./floating-ball.md)

