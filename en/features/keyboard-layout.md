# Keyboard Layout & Buttons

This page introduces the main keyboard UI, the customizable action row, the AI Edit panel, and the number/symbol keyboard.

## Main Keyboard Buttons

### Top row

- **AI Edit (pencil)**: enter AI Edit panel. Requires ASR and LLM to be configured; otherwise the status bar will ask you to configure keys first.
- **AI Post-processing toggle (magic wand)**: enable/disable auto AI post-processing after each recognition. See [AI Post-processing](./ai-postprocess.md).
- **Clipboard (clipboard icon)**: open the built-in clipboard panel to browse and insert recent clips.
- **Backspace**: delete the character before cursor. Supports long-press delete and gesture actions (see [Gestures](./gestures.md)).

### Middle row (overlay row)

- **Settings (gear)**: open app settings.
- **Prompt selector (document icon)**: choose an AI post-processing prompt preset.
- **Switch IME (keyboard icon)**: open system IME picker. If Fcitx5 linking is enabled, it will try to switch back to the previous IME first. You can also set a fixed target under `Settings → Input Settings → Switch target IME` (default: previous IME).
- **Enter**: newline or editor action depending on the target input field.

### Punctuation & space row

- **Number/Symbol keyboard**: the leftmost "123" key.
- **Merged punctuation keys A/B**: the two punctuation keys in the middle:
  - Tap: input the 1st/3rd commonly-used punctuation.
  - Swipe up: input the 2nd/4th punctuation.
  Configure in `Settings → Other Settings → Custom punctuation keys`.
- **Quick provider switch**: the rightmost dot icon; cycles through configured ASR providers.
- **Space**: the middle long key. In press-and-hold mode, you can press and hold the mic and slide down to the space area to lock recording; tap space again to stop.

## Custom Action Row

At the top of the keyboard, there is a row of up to 4 customizable action buttons (default: Undo, Select All, Copy, Hide keyboard).

### Where to configure

- Path: `Settings → Input Settings → Custom action buttons`
- Choose up to 4 actions; order maps left-to-right.

### Example actions

- **Undo**: undo the last text change (voice commit, AI post-processing, manual typing, etc.)
- **Select all**: select all text in the current input field
- **Copy**: copy current selection to clipboard
- **Paste**: paste clipboard at cursor (undoable)
- **Selection mode**: enable/disable selection mode to refine selection with cursor keys
- **Cursor left / right**: move by one character; long-press to repeat
- **Move to start / end**: jump to start/end of text
- **VAD toggle**: quickly enable/disable auto-stop on silence
- **Hide keyboard**: minimize the keyboard

If an action is stateful (e.g. Selection mode or VAD toggle), the icon reflects the current state (highlighted/dimmed).

## IME Switching Tips

### Quick Settings tile

You can add a system Quick Settings tile named "Switch input method":

1. Pull down Quick Settings
2. Tap Edit (pencil icon)
3. Find "Switch input method" and add it

Tapping the tile opens the system IME picker.

### Haptic strength

If haptics feel too strong/weak, adjust it under `Settings → Input Settings → Input/tap haptic strength`.

## AI Edit Panel

AI Edit lets you "rework" existing text (polish, translate, or edit by instruction).

### How to open

1. Tap **AI Edit** (pencil) on the main keyboard.
2. If ASR/LLM is not configured, the status bar will prompt you to finish setup first.

### Typical workflow

1. Select text in the target app. If no selection, the panel edits the whole input field by default (you can change this in `Settings → AI Post-processing` to prefer "last recognition result").
2. Tap the microphone button and speak an instruction (e.g. "Translate to English and simplify").
3. Tap mic again or release (depending on recording mode) and wait for ASR + AI to finish.
4. The result replaces the selection (or the whole text). Use Undo to revert.

### Buttons in the panel

- **Back**: return to main keyboard.
- **Apply preset prompt**: choose a prompt preset for the current edit only.
- **Cursor left / right**: move cursor; long-press to repeat.
- **Move to start / end**: jump to start/end.
- **Selection mode**: toggle selection mode and extend selection with cursor moves.
- **Select all**
- **Copy**: copy selection to clipboard and show preview.
- **Paste**: paste at cursor (undoable).
- **Backspace**: same behavior as main keyboard backspace, including swipe-to-clear/undo gestures.
- **Number keyboard**: open number/symbol keyboard; returning goes back to AI Edit.

## Number & Symbol Keyboard

For quick input of digits and common symbols.

### Open / return

- Open: tap the "123" key on the main keyboard, or tap the number keyboard button in AI Edit.
- Return: tap the bottom-left back key:
  - If opened from AI Edit, it returns to AI Edit.
  - Otherwise it returns to the main keyboard.

### Layout

- **Number row**: `0–9`, equal width.
- **Symbol area**: two fixed rows:
  - Row 1: common punctuation (comma, period, question mark, etc.)
  - Row 2: brackets, slashes, etc., with backspace at the end
- **Bottom bar**:
  - Back key
  - Punctuation language toggle (CN/EN punctuation)
  - Space
  - Enter

The symbol style updates immediately when you toggle CN/EN punctuation.

