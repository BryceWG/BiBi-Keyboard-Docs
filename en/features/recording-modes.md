# Recording Modes

BiBi Keyboard provides two recording modes to fit different workflows.

## Overview

| Mode             | How to trigger                               | Best for |
| ---------------- | -------------------------------------------- | -------- |
| **Press and hold** | hold the mic button to record; release to stop | classic IME feel; precise control |
| **Tap to toggle**  | tap the mic button to start/stop               | long dictation; hands-free |

## Press and hold (default)

### How to use

1. **Start**: press and hold the mic button
2. **Continue**: keep holding
3. **Stop**: release finger

### Setting

- Key: `micTapToggleEnabled = false` (default)
- Path: `Settings → ASR Settings → Tap mic to start/stop` (off)

### Pros / cons

::: tip Pros

- ✅ intuitive; matches most keyboards
- ✅ precise control of duration
- ✅ quick stop on release
  :::

::: warning Cons

- ⚠️ finger fatigue for long recordings
- ⚠️ you must keep holding, hard to do other actions
  :::

### Gestures

- **Swipe left**: cancel recording
- **Swipe right**: send/commit recognition immediately
- **Swipe down**: temporarily lock recording (press-and-hold mode only)

## Tap to toggle

### How to use

1. **Start**: tap the mic button
2. **Continue**: hands-free recording
3. **Stop**: tap the mic button again

### Setting

- Key: `micTapToggleEnabled = true`
- Path: `Settings → ASR Settings → Tap mic to start/stop` (on)

### Pros / cons

::: tip Pros

- ✅ hands-free, good for long recording
- ✅ you can read/scroll while recording
- ✅ no finger pressure
- ✅ good for long dictation
  :::

::: warning Cons

- ⚠️ easy to forget to stop
- ⚠️ slightly higher accidental trigger risk
  :::

### Gestures

- **Swipe left**: cancel recording
- **Swipe right**: send/commit recognition immediately

### Recommended scenarios

- long dictation (articles, reports)
- meeting notes
- record while doing other actions
- combine with VAD auto-stop

## Quick Switch Button

If you often switch between short messages and long dictation, add the "Recording mode switch" action to your keyboard layout:

1. Open `Settings → Input Settings → Custom keyboard layout`
2. Pick an action-row or keyboard button position
3. Set its action to `Recording mode switch`
4. Return to the keyboard and tap it to switch between press-and-hold and tap-to-toggle recording

## Works best with VAD

Tap-to-toggle + auto-stop on silence (VAD) gives an experience close to continuous conversation:

```
Settings → ASR Settings → Tap mic to start/stop: ON
Settings → ASR Settings → Auto-stop on silence (VAD): ON
```

## Related

- [Auto-stop on Silence (VAD)](./vad.md)
- [Floating Ball](./floating-ball.md)
- [Gestures](./gestures.md)

