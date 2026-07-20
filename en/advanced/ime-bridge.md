# IME Bridge Module

IME Bridge is a standalone LSPosed/LSPatch extension for BiBi Keyboard. It lets the floating ball preview and insert recognition text through the current third-party keyboard, and can optionally add hold-to-record at the bottom of a compatible IME.

- Repository: [BryceWG/bibi-keyboard-lsposed-bridge](https://github.com/BryceWG/bibi-keyboard-lsposed-bridge)
- Latest release: [GitHub Releases](https://github.com/BryceWG/bibi-keyboard-lsposed-bridge/releases/latest)

::: warning Advanced feature
The module runs inside selected third-party keyboard processes and requires LSPosed or LSPatch. Install it only from a trusted source and limit its scope to keyboards that actually need the bridge.
:::

## What it provides

| Capability | OSS | Pro | Description |
| ---------- | --- | --- | ----------- |
| Floating-ball text insertion | ✅ | ✅ | The current third-party IME commits final recognition text directly |
| Streaming preview | ✅ | ✅ | Displays partial results as composing text when supported and cleans them up on finish/cancel |
| Keyboard visibility | ✅ | ✅ | Reports IME panel visibility without relying only on Accessibility detection |
| In-IME recording | ✅ | ✅ | Hold the bridge area at the bottom of a third-party keyboard and release to send audio to BiBi Keyboard |
| Privileged clipboard R/W | ✅ | ✅* | Reads/writes the system clipboard inside the target IME process so SyncClipboard can work outside BiBi’s own keyboard; credentials and HTTP stay in BiBi |
| Input-field context | ❌ | ✅ | Provides cursor-adjacent text to AI post-processing when the related option is enabled |

\* Both OSS and Pro require module 0.2.4 or newer with `supports_clipboard` advertised.

The module does not run ASR or AI post-processing. Recording orchestration, provider selection, backup engines, history, SyncClipboard networking, and final processing remain owned by BiBi Keyboard.

::: tip Clipboard sync limits
Bridge clipboard access only works while the target IME process is alive. If the system kills the keyboard, observe/write pause until that IME is opened again. This is not an always-on daemon.
:::

## Requirements

- Android 8.0 (API 26) or later
- A recent OSS or Pro build of BiBi Keyboard
- A working ASR provider configured in BiBi Keyboard
- One of these environments:
  - a rooted device with LSPosed installed and enabled
  - a device where you can patch the target keyboard APK with LSPatch
- A target keyboard based on the standard Android `InputMethodService`; heavily customized or integrity-protected IMEs may be incompatible

::: tip Choose the target IME first
The “target IME” is the third-party keyboard you normally use and want BiBi Keyboard to insert text through. Select that keyboard in the LSPosed scope—not BiBi Keyboard itself.
:::

## Download

1. Open the module's [Releases page](https://github.com/BryceWG/bibi-keyboard-lsposed-bridge/releases/latest)
2. Download the latest APK
3. Install it; it appears as **BiBi IME Bridge** in the app and module lists

Keep BiBi Keyboard and IME Bridge reasonably up to date. Older bridge versions may still insert text but lack newer recording, session, or input-context capabilities.

## Install with LSPosed

1. Install the IME Bridge APK
2. Open LSPosed Manager and enable **BiBi IME Bridge**
3. Open its scope and select only the third-party keyboard(s) you want to bridge
4. Do not add either the OSS or Pro BiBi Keyboard app to the scope
5. Force-stop and reopen the target keyboard; reboot the device if it still does not activate
6. Switch to the target keyboard, then refresh bridge status in BiBi Keyboard

::: warning Minimal scope
Do not select the Android system framework or unrelated apps. A wider scope does not add functionality and only loads the module into unnecessary processes.
:::

## Install with LSPatch

1. In LSPatch, select the third-party keyboard APK you want to bridge
2. Patch it with IME Bridge as an embedded module
3. Install the patched keyboard and select it as the current IME
4. When the keyboard is updated, patch the new APK again

::: warning Signing and account risks
LSPatch changes the APK signature. LSPosed modules may cause system instability or even system crashes; make sure you have a rescue method before using them. Back up the keyboard's configuration first. Use LSPosed instead if you are not willing to take these risks.
:::

## Enable it in BiBi Keyboard

1. Open `Settings → UI & Interaction → Floating Settings`
2. Enable “IME bridge text insertion” and “Record inside bridged IME” (optional, see below)
3. Focus a normal text field and keep the target keyboard open
4. Tap “IME bridge status” to refresh detection
5. Confirm that it shows the correct target keyboard and an active input connection

Floating-ball results now prefer insertion through the target IME. If the bridge is temporarily unavailable, BiBi Keyboard can still try Accessibility insertion or the clipboard fallback.

### Normal workflow

1. Focus a normal text field in any app
2. Make sure the scoped third-party keyboard is open
3. Start recording from the floating ball
4. When streaming partial results are available, they appear as reversible composing text
5. On completion, the target IME commits the final text; cancelling the session also removes its preview

Password, payment, and other sensitive fields are intentionally blocked.

## Record inside a third-party IME

This requires a recent IME Bridge and `PCM` shown as supported in bridge status.

1. Enable “Record inside bridged IME” under `Settings → UI & Interaction → Floating Settings`
2. In Android app permissions, allow the **target third-party keyboard** to use the microphone
3. Focus a normal text field and hold the bridge area near the bottom center of the keyboard for about 0.2 seconds
4. Start speaking when the recording waveform appears
5. Release to stop; BiBi Keyboard processes the audio with the current ASR, backup-engine, and AI post-processing settings

Recording in the target IME also follows BiBi Keyboard's “Audio ducking during recording” setting.

::: warning Touch-area limitation
The bottom bridge area must own the initial touch event, so short taps inside it may also be consumed. If it overlaps an existing key, adjust its width/height in the **BiBi IME Bridge** app, or disable in-IME recording while keeping text insertion enabled.
:::

Recording failures do not automatically fall back to the floating ball or BiBi Keyboard's own microphone. Resolve the problem and trigger recording again.

## Adjust the recording area

After installing the module, open **BiBi IME Bridge** from the app list:

- Preview idle and recording waveforms
- Adjust capture width from 120–280 dp (default: 190 dp)
- Adjust height from 24–72 dp (default: 32 dp); increasing it also lifts the area slightly above the bottom edge
- Restore defaults with one tap

Reopen the target keyboard after changing these values. Some LSPosed/LSPatch environments may prevent the hooked process from reading custom values; the module then safely uses its defaults.

## Pro: Input-field context <Badge type="warning" text="Pro" />

When Pro's AI post-processing “Input-field context” option is enabled, the floating ball can use IME Bridge to obtain text near the cursor so the LLM can better understand continuity, terminology, and tone.

- Requested only when both input-field context and AI post-processing are enabled
- Used only as reference, not as the transcript being processed
- Refused for password and other sensitive fields
- API logs record result status and character counts, not context content

See [Pro Features](/en/pro/features#input-field-context) for details.

## Status and troubleshooting

| Status or symptom | What to do |
| ----------------- | ---------- |
| No bridge response | Confirm the module is enabled, the current IME is in scope, and restart the IME or device |
| No active keyboard | Switch to the scoped target IME and open its panel |
| No active input connection | Focus a normal text field, keep the keyboard visible, and refresh status |
| Waiting for input field | The module is detected but no writable editor is active; tap the text field again |
| Sensitive field blocked | This is an intentional safety restriction; test in a normal text field |
| `PCM` unsupported | Update IME Bridge, enable in-IME recording, and restart the target keyboard |
| Target keyboard cannot record | Grant microphone permission to the target IME and make sure no other app owns the microphone exclusively |
| Generic bottom trigger unsupported | The IME window is incompatible; keep text insertion only or try another keyboard |
| Text still uses Accessibility | Check bridge status, current IME, and active input connection |
| Stops working after an IME update | Restart the target process for LSPosed; patch the updated APK again for LSPatch |

If the cause is still unclear, open `Settings Home → Recognition History`, tap `API Log`, and inspect it together with LSPosed logs to confirm that the module entered the correct IME process. Check logs for personal information before sharing them.

## Permissions and privacy

- Xposed modules have powerful access; use minimal scope and APKs from the official repository
- Normal text insertion does not read existing text from the input field
- Pro input context reads limited cursor-adjacent text only when explicitly enabled and fails closed for sensitive fields
- In-IME recording captures audio in the target IME process and sends it to BiBi Keyboard; an online ASR provider may then upload it under that provider's rules
- The module does not independently store/transcribe audio or run AI post-processing

## IME Bridge vs AIDL integration

| Item | IME Bridge | AIDL integration |
| ---- | ---------- | ---------------- |
| Target IME | A third-party keyboard that can be hooked through LSPosed/LSPatch | An IME that actively integrates BiBi Keyboard's AIDL protocol |
| Hook required | Yes | No |
| Main entry point | Floating ball or bottom in-IME recording area | Voice entry provided by the calling IME |
| Text delivery | Through the current IME's input connection | The caller receives recognition callbacks and handles the result |

If you use fxliang Fcitx5 with built-in voice integration, prefer [AIDL Integration (Fcitx)](/en/advanced/aidl-integration).

## Related pages

- [Floating Ball](/en/features/floating-ball)
- [History & Diagnostics](/en/advanced/diagnostics)
- [IME Bridge repository](https://github.com/BryceWG/bibi-keyboard-lsposed-bridge)
