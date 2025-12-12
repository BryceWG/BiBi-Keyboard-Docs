# Gestures

BiBi Keyboard provides rich gesture interactions to control input, edit text, and manage content efficiently.

## Backspace gestures

Backspace supports multiple modes: single-char delete, continuous delete, clear all, and undo.

### Basic

| Gesture       | Action            | Notes                                |
| ------------ | ----------------- | ------------------------------------ |
| **Tap**      | delete one char    | standard backspace                   |
| **Long-press** | continuous delete | deletes one char every 50ms          |
| **Swipe up** | clear all text     | deletes all content in the editor    |
| **Swipe left** | clear all text    | same as swipe up                     |
| **Swipe down** | undo              | undo last change (up to 3 steps)     |

#### Avoiding false triggers

To reduce accidental actions:

1. **Long-press priority**: press > 500ms to count as long-press
2. **Distance threshold**: swipe distance must be > 50dp (~8mm)
3. **Direction clarity**: swipe angle must match the target direction
4. **Cancel**: moving back to origin cancels the gesture

### Tips

#### Quickly clear wrong input

```
Hold backspace → swipe up → release
```

#### Undo a mistake

```
Hold backspace → swipe down → release
```

#### Typical flow

```
Voice input → [AI done] → backspace swipe down (undo) → voice input again
```

## Global undo

Besides backspace gestures, the customizable action row can include a global Undo button to undo various text changes.

### What can be undone

| Action type              | Undoable | Result after undo |
| ----------------------- | -------- | ----------------- |
| Voice recognition commit | ✅        | removes transcript |
| AI post-processing edit  | ✅        | restores raw transcript |
| Manual typing            | ✅        | removes typed text |
| Character deletion       | ✅        | restores deleted content |
| Paste                    | ✅        | removes pasted content |
| AI Edit                  | ✅        | restores previous text |
| Clear all                | ✅        | restores cleared content |

### Undo stack

BiBi Keyboard uses a stack:

```
[Latest] → Op3 → Op2 → Op1 → [Oldest]
           ↑undo  ↑undo  ↑undo
```

- Capacity: up to 3 states
- When full, the oldest entry is dropped

## Other gestures

### Microphone button gestures

#### Press-and-hold (default)

- **Hold**: start recording
- **Release**: stop recording
- **Swipe left**: cancel
- **Swipe right**: send/commit immediately
- **Swipe down**: lock recording (no need to keep holding)

#### Tap-to-toggle

- **Tap**: start/stop recording
- **Long-press**: cancel
- **Swipe left**: cancel
- **Swipe right**: send/commit immediately

::: info More details
See [Recording Modes](./recording-modes.md).
:::

### Floating ball gestures

- **Tap**: start recording
- **Long-press then drag toward center**: open radial menu
- **Long-press ~2s then drag**: move position; release to snap to edge

::: info More details
See [Floating Ball](./floating-ball.md).
:::

## Related

- [Recording Modes](./recording-modes.md)
- [Floating Ball](./floating-ball.md)
- [Keyboard Layout & Buttons](./keyboard-layout.md#ai-edit-panel)

