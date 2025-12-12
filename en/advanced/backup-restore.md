# Backup & Restore

BiBi Keyboard supports full settings backup and restore, including manual export/import and WebDAV auto backup (Pro feature).

## Manual backup/restore

Manual backup exports all settings into a JSON file that you can save and restore later.

### Export settings

Go to `Settings → Backup & Restore → Export settings` to export current config as JSON.

::: info Version field
Exported JSON contains a `_version` field (currently `1`) for future compatibility.
:::

::: warning Sensitive data
The export contains API keys, passwords and other secrets. Keep it safe and do not share or upload it publicly.
:::

### Import settings

Go to `Settings → Backup & Restore → Import settings` to restore from a JSON file.

::: tip Partial restore
If you only want to restore part of the config, you can edit the JSON file and remove fields you don't want to import.
:::

### Backup file format

It is standard JSON and can be edited manually.

Example snippet:

```json
{
  "_version": 1,
  "app_language_tag": "zh-Hans",
  "keyboard_height_tier": 2,
  "asr_vendor": "siliconflow",
  "sf_free_asr_enabled": true,
  "trim_final_trailing_punct": true
}
```

::: info Key naming
Config keys correspond to `KEY_*` constants in `Prefs.kt` and use snake_case.
:::

## History backup

### ASR history

| Key              | Type   | Description                         |
| ---------------- | ------ | ----------------------------------- |
| `asr_history_json` | String | recognition history (JSON array)    |

Recognition history is included in the backup (if history feature is enabled).

::: warning Privacy
History contains all recognized text. If you are concerned about privacy:

1. enable `disableAsrHistory` to disable history
2. clear history before exporting
3. or remove the `asr_history_json` field manually after export
:::

### Clipboard history

| Key              | Type   | Description                            |
| ---------------- | ------ | -------------------------------------- |
| `clip_history_json` | String | non-pinned clipboard history (not exported) |
| `clip_pinned_json`  | String | pinned clipboard items (exported)          |

Only pinned clipboard items are included in the backup.

## WebDAV auto backup <Badge type="warning" text="Pro" />

Pro version provides WebDAV auto backup to periodically sync settings to cloud storage.

### WebDAV settings

| Key             | Type   | Description            |
| -------------- | ------ | ---------------------- |
| `webdavUrl`      | String | WebDAV server URL      |
| `webdavUsername` | String | WebDAV username        |
| `webdavPassword` | String | WebDAV password        |

Configure in `Settings → Backup & Restore → WebDAV settings (Pro)`.

### Auto backup

Auto backup is implemented by `AutoBackupWorker`:

- scheduled via Android WorkManager
- supports choosing backup frequency (daily/weekly/monthly)

### Manual WebDAV backup

`Settings → Backup & Restore → Backup to WebDAV now`

### Restore from WebDAV

`Settings → Backup & Restore → Restore from WebDAV`

## Troubleshooting

### Import failed

Possible causes:

1. invalid JSON (file corrupted or edited incorrectly)
2. incompatible version (backup from a future app version)
3. invalid values (out of range)

Fix:

- validate JSON format
- ensure file is complete
- avoid editing unknown fields

### WebDAV backup failed

Checklist:

- verify network and WebDAV config
- test WebDAV URL in browser
- delete old backups to free server space
- check the error message shown in the app

