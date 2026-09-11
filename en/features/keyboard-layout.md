# Keyboard Layout & Buttons

This page introduces the main keyboard UI, the custom keyboard layout editor, the AI Edit panel, and the number/symbol keyboard.

::: tip Long-press hints
Main keyboard buttons and AI Edit panel buttons support long-press hints. If you are unsure what an icon does, long-press it first to check.
:::

## Main Keyboard Default Layout

### Top row

- **AI Edit (pencil)**: enter AI Edit panel. Requires ASR and LLM to be configured; otherwise the status bar will ask you to configure keys first.
- **AI Post-processing toggle (magic wand)**: enable/disable auto AI post-processing after each recognition. See [AI Post-processing](./ai-postprocess.md).
- **Clipboard (clipboard icon)**: open the built-in clipboard panel to browse and insert recent clips. Swipe right to pin/unpin and left to delete; unpin a pinned item before deleting it.
- **Backspace**: delete the character before cursor. Supports long-press delete and gesture actions (see [Gestures](./gestures.md)).

### Middle row (overlay row)

- **Settings (gear)**: open app settings.
- **Prompt selector (document icon)**: choose an AI post-processing prompt preset.
- **Switch IME (keyboard icon)**: open system IME picker. If "IME switcher key returns to the specified input method" is enabled, it goes straight back to the IME chosen under `Settings → Input → Input Settings → Input Behavior → Target IME` (falls back to the previous IME if not set).
- **Enter**: newline or editor action depending on the target input field.

### Punctuation & space row

- **Number/Symbol keyboard**: the leftmost "123" key.
- **Merged punctuation keys A/B**: the two punctuation keys in the middle:
  - Tap: input the 1st/3rd commonly-used punctuation.
  - Swipe up: input the 2nd/4th punctuation.
  Configure in `Settings → System → Other Settings → Custom punctuation keys`.
- **Quick provider switch**: the rightmost dot icon; cycles through configured ASR providers.
- **Space**: the middle long key. In press-and-hold mode, you can press and hold the mic and slide down to the space area to lock recording; tap space again to stop.

## Custom Keyboard Layout Editor

The whole keyboard is built from grid blocks driven by the layout editor. You can place frequently used buttons where you like, resize blocks, and hide functions you rarely use.

### Where to configure

Path: `Settings → Input → UI Settings → Keyboard UI → Custom keyboard layout`

1. Pick the panel to edit at the top of the editor
2. Tap a button block on the canvas
3. Choose a new action from the action list, or adjust the block size
4. Save and return to the keyboard to check the result

Editor capabilities:

- **Three panels edited separately**: Main, AI edit, and Recording (the recording panel contains the "Swipe Left Cancel" and "Swipe Right Send" gesture blocks)
- **Adjustable rows/columns**: 7 columns × 4 rows by default
- **Block resizing**: most blocks support several size combinations
- **Reset**: restore the default layout any time
- **JSON import/export**: copy your layout JSON to share it, or import a layout shared by others

::: tip Suggestion
When trying it for the first time, change only a few blocks before doing a full customization.
:::

### Available actions

**Extension actions** (the default layout places "Undo, Select All, Copy, Hide keyboard" on both top corners; besides panel fixed blocks they can be added freely, and each action can appear at most once in a layout):

| Action | Description |
| ------ | ----------- |
| Undo | undo the last text change (voice commit, AI post-processing, manual typing, etc.) |
| Select All | select all text in the current input field |
| Copy | copy the current selection to clipboard |
| Paste | paste clipboard at cursor (undoable) |
| Selection Mode | enable/disable selection mode to refine selection with cursor keys |
| Recognition history | open the in-keyboard history panel. Tap an entry to insert its text; swipe right to polish again, swipe left to recognize again (see [Voice Input Basics](./voice-input.md#in-keyboard-recognition-history)) |
| Clipboard | open the clipboard panel to browse and insert recent clips |
| Hide keyboard | minimize the keyboard |
| Auto-stop on silence | quickly enable/disable "stop when speech ends" |
| Recording mode | quickly switch between press-and-hold and tap-to-toggle recording |
| Floating keyboard | toggle the floating keyboard window |
| Auto enter after input | toggle automatic sending; when on, every recognition (and optional AI post-processing) finishes with an automatic Enter/send action. You can also enable it under `Settings → Input → Input Settings → Input Behavior → Auto enter after input`; to send only one result, leave it off and swipe right on the microphone while recording |
| Move Left / Right | move by one character; long-press to repeat |
| Previous / Next punctuation | move the cursor to the previous/next sentence punctuation |
| Move to Start / End | jump to the start/end of the text |
| Numpad | open the number/symbol keyboard |

**Panel fixed blocks** (can be moved and resized in the editor):

| Panel | Fixed blocks |
| ----- | ------------ |
| Main | Microphone, Status, AI Edit, AI Polish, Clipboard, Backspace, Settings, Switch polish prompt, Switch input method, Enter, Number pad, the two punctuation keys (shown as "Custom keys 2/3" in the editor), Space, Switch ASR provider |
| AI edit | AI info, Microphone, Back to main keyboard, Apply preset prompt, Select all, Backspace, Move cursor left/right, Copy, Paste, Number pad, Toggle selection mode, Space, Move to start/end |
| Recording | Swipe Left Cancel, Swipe Right Send |

If an action is stateful (e.g. Selection Mode or Auto-stop on silence), the icon reflects the current state (highlighted/dimmed).

## IME Switching Tips

### Quick Settings tile

You can add a system Quick Settings tile named "Switch input method":

1. Pull down Quick Settings
2. Tap Edit (pencil icon)
3. Find "Switch input method" and add it

Tapping the tile opens the system IME picker.

### Haptic strength

If haptics feel too strong/weak, adjust it under `Settings → Input → UI Settings → Keyboard UI → Input/tap haptic strength`.

## AI Edit Panel

AI Edit lets you "rework" existing text (polish, translate, or edit by instruction).

### How to open

1. Tap **AI Edit** (pencil) on the main keyboard.
2. If ASR/LLM is not configured, the status bar will prompt you to finish setup first.

### Typical workflow

1. Select text in the target app. If no selection, the panel edits the whole input field by default (you can change this in `Settings → Smart → AI Feature Settings` to prefer "last recognition result").
2. Tap the microphone button and speak an instruction (e.g. "Translate to English and simplify").
3. Tap mic again or release (depending on recording mode) and wait for ASR + AI to finish.
4. The result replaces the selection (or the whole text). Use Undo to revert.

To avoid replacing unintended text, it is recommended not to adjust the selection or move the cursor after recording starts. If accidental touches change the replacement range, undo first, reselect the target text, then try again.

### Info bar (top status strip)

- **Idle**: shows operation guidance for the current recording mode (tap to start/stop, or press-and-hold to speak then release).
- **Recording**: shows "Please speak your editing instruction..." or the real-time recognized instruction text.
- **Processing**: shows "AI Editing...".
- **Error**: temporarily shows an error message to help locate the issue quickly.

### Buttons in the panel

- **Back**: return to main keyboard.
- **Apply preset prompt**: choose a prompt preset for the current edit only.
- **Cursor left / right**: move cursor; long-press to repeat.
- **Move to start / end**: jump to start/end.
- **Selection mode**: toggle selection mode and extend selection with cursor moves.
- **Select all**
- **Copy**: copy selection to clipboard and show preview.
- **Paste**: paste at cursor (undoable).
- **Space**: insert a space. If recording is in progress (for example, while speaking an edit instruction), tapping space will not insert a space.
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
