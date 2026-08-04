# History & Diagnostics

This page explains how to use recognition history, API Log, and the Recording Test page to troubleshoot provider setup, network requests, local model loading, and recording quality.

## Recognition History

Recognition History lets you review previous voice input results and basic metrics.

### Where to open

1. Open BiBi Keyboard settings
2. From the settings home page, open `Recognition History`
3. Browse by source, time, or content

### What you can inspect

- **Source**: keyboard input, floating ball input, external input, etc.
- **Provider**: the ASR engine used for that recognition
- **Transcript**: the resulting text
- **Timing**: total time, ASR time, and AI post-processing time when available

## API Log

API Log stores recent ASR / LLM call summaries. It is useful for checking whether a failure comes from credentials, endpoint configuration, model name, network issues, or a provider-side error.

### Where to open

1. Open `Settings Home → Recognition History`
2. Tap `API Log`
3. Use the filters to show ASR, LLM, or failed calls

### What is recorded

API Log includes:

- Provider, model, request host, and path
- Duration and success / failed / canceled status
- Request structure summary, response summary, or error message
- Local ASR model loading and inference summaries

::: warning Privacy
API Log stores only local request summaries. API keys, recorded audio, and full transcripts are not saved in API Log.
:::

### When to check API Log

- A newly configured API key fails during testing
- A provider suddenly stops working
- You want to verify which model or endpoint is being called
- A local model is slow on first use and you want to confirm model loading
- AI post-processing returns an empty result or an error

## Recording Test

The Recording Test page lets you test the current ASR setup without opening the keyboard, while showing key recording and recognition status.

### How to use

1. Open `Settings Home → Recording Test`
2. Confirm the current ASR configuration
3. Tap the record button and speak
4. Review the transcript, error message, timing, and audio analysis information

### Recommended use cases

- Verify a newly configured provider before using it in the keyboard
- Confirm that a local model is downloaded and can load correctly
- Compare results after changing VAD, silent-part filtering, or upload compression
- Capture an error message or API Log summary before reporting a problem

## Usage Stats

Open `Usage Stats` from the settings home page to view:

- Total audio time, recognized characters, session count, and average input speed
- Activity for the last seven days, plus 7-day and 4-week averages
- Usage by ASR provider and online ASR failure rates for the last 30 days

Tap the share button in the top-right corner to preview a usage card, then save it to `Pictures/BiBi` or share it through Android. The card uses the current UI theme.

To stop storing these local aggregates, enable `Disable usage statistics` under `Settings → Other Settings`. This clears existing statistics and stops recording new data.

## Clearing Records

You can clear recognition history or API Log from their page menus. This only deletes local history and summaries; it does not affect usage records in provider consoles.

## Related

- [Voice Input Basics](/en/features/voice-input) - ASR providers and recognition flow
- [Auto-stop on Silence](/en/features/vad) - VAD and silent-part filtering
- [Backup & Restore](./backup-restore.md) - export and restore app settings
