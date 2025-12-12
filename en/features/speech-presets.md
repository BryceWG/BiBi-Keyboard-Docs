# Speech Presets

Speech presets let you create shortcut replacement rules for commonly used phrases. When the ASR result matches a trigger phrase, it is automatically replaced with your preset content, greatly improving repeated input efficiency.

## Overview

### How it works

```
Voice input → ASR → exact match preset trigger → replace with preset content → insert
```

Logic:

1. Perform speech recognition normally
2. Match the transcript against preset triggers
3. If matched (exact or case-insensitive), replace with preset content
4. Otherwise keep original transcript

### Good for

::: tip Recommended

- ✅ common phrases: email, phone number, address
- ✅ canned replies: "OK", "Received", etc.
- ✅ terms: "ASR" → "Automatic Speech Recognition"
- ✅ long templates: signatures, disclaimers
- ✅ emoji combos: e.g. "haha" → "hahaha 😄"
  :::

## Data & config

| Key                  | Type   | Description                                      |
| ------------------- | ------ | ------------------------------------------------ |
| `speechPresetsJson` | String | preset list JSON                                  |
| `activeSpeechPresetId` | String | active preset id (reserved; currently unused)  |

### Preset data structure

Each preset has 3 fields:

```kotlin
data class SpeechPreset(
    val id: String,        // UUID
    val name: String,      // trigger phrase (what you say)
    val content: String    // replacement (what gets inserted)
)
```

Example:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "my email",
  "content": "example@domain.com"
}
```

## Usage

### Create a preset

1. Open `Settings → Other features → Speech presets`
2. Enter a trigger phrase (e.g. "my email")
3. Enter replacement content (e.g. "example@domain.com")
4. Tap "Add"

::: tip Naming tips

- Keep trigger phrases short and easy to say
- Make triggers unique to avoid conflicts
- Prefer consistent patterns like "my ___", "___ address", etc.
  :::

### Use a preset

1. Use voice input as usual
2. Speak the trigger phrase
3. The transcript is replaced automatically
4. The final text is inserted into the editor

### Edit a preset

1. Open `Settings → Other features → Speech presets`
2. Select a preset from the dropdown
3. Modify trigger/content
4. Tap "Update" (if available)

::: warning Note
Some versions may require deleting and re-adding a preset to modify it. Follow the actual UI behavior.
:::

### Delete a preset

1. Select the preset
2. Tap "Delete" and confirm

## Matching rules

### Exact match first

1. **Exact match**: transcript equals trigger phrase exactly (including spaces and case)
2. **Case-insensitive match**: same content but different case

### Examples

| Trigger       | Transcript       | Match | Type               |
| ------------ | ---------------- | ----- | ------------------ |
| "my email"   | "my email"       | ✅     | exact              |
| "my email"   | "my  email"      | ❌     | whitespace differs |
| "ASR"        | "asr"            | ✅     | case-insensitive   |
| "received"   | "received it"    | ❌     | not equal          |
| "ok"         | " ok "           | ✅     | trimmed spaces     |

## Practical examples

### Personal info

```json
[
  {
    "name": "my email",
    "content": "your.email@example.com"
  },
  {
    "name": "my phone",
    "content": "13800138000"
  },
  {
    "name": "my address",
    "content": "Room XX, No. XX Road, Chaoyang District, Beijing"
  }
]
```

### Templates

```json
[
  {
    "name": "email signature",
    "content": "Best regards,\\n\\nJohn Doe\\nSenior Engineer\\nACME Corp\\nPhone: +1-xxx\\nEmail: john@example.com"
  },
  {
    "name": "disclaimer",
    "content": "This message is for reference only and does not constitute investment advice."
  }
]
```

## How it interacts with other features

### With AI post-processing

Speech presets run **before** AI post-processing:

```
ASR → [speech preset replacement] → [AI post-processing] → insert
```

### With ASR providers

Speech presets are provider-agnostic:

- ✅ works for all providers
- ✅ works for cloud and local engines
- ✅ works for both streaming and non-streaming modes

Best practice: pick an accurate ASR provider so trigger phrases are recognized correctly.

### With floating ball

Floating ball voice input fully supports speech presets:

```
Floating ball recording → ASR → preset match → insert into active editor
```

## Notes

::: warning Avoid conflicts

- ❌ avoid very common phrases (e.g. "ok", "thanks")
- ❌ avoid too-short triggers (single syllable)
- ❌ avoid conflicting replacements for common expressions
  :::

::: tip Recommended trigger design

- ✅ use fixed patterns ("my ___", "___ address")
- ✅ use proper nouns (company email, home address)
- ✅ use abbreviations (ASR, LLM)
- ✅ use unique phrases ("insert signature", "append disclaimer")
  :::

### Performance

- **Count**: keep under ~50 presets (too many slows matching)
- **Complexity**: linear scan, O(n)
- **Content length**: unlimited, but very long content may affect UX

