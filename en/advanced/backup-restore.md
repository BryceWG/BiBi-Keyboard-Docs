# Backup and Sync

BiBi Keyboard supports full config backup and restore, including file backup, WebDAV sync, and Pro auto backup.

The backup page lives in `Settings → System → Backup and Sync`.

## File backup

File backup exports all settings into a JSON file that you can save and restore later.

### Export to File

In `Settings → System → Backup and Sync → File Backup`, tap **Export to File** to export the current config as JSON.

::: info Version field
Exported JSON contains a `_version` field (currently `1`) for future compatibility.
:::

::: warning Sensitive data
The export contains API keys, passwords and other secrets. Keep it safe and do not share or upload it publicly.
:::

### Import from File

In `Settings → System → Backup and Sync → File Backup`, tap **Import from File** to restore from a JSON file.

::: tip Partial restore
The backup JSON can be edited manually: if you only want to restore part of the config, remove the fields you don't want before importing. Edit carefully; malformed JSON can make the import fail.
:::

## WebDAV sync

WebDAV sync stores your config on a WebDAV server so it can be restored across devices. It is available in the open-source edition.

### WebDAV settings

In `Settings → System → Backup and Sync → WebDAV Sync`, fill in the server info:

| Setting | Description |
|---------|-------------|
| Server address | WebDAV server URL (e.g. `https://dav.example.com`) |
| Username | WebDAV username (optional) |
| Password | WebDAV password (optional) |

### Upload / Restore

- **Upload**: upload the current config to the WebDAV server
- **Restore**: download the config from the WebDAV server and apply it

## Auto backup (Pro) <Badge type="warning" text="Pro" />

Pro supports scheduled auto backup: the config is uploaded to WebDAV automatically at the configured interval.

1. Open `Settings → System → Backup and Sync → Auto Backup (Pro)`
2. Enable **Enable auto backup** and fill in the WebDAV server info
3. Set the backup interval: an interval value plus a unit (hours/days), minimum 6 hours
4. The page shows the next scheduled backup time and the last backup status

::: info Note
WebDAV backup content is the same as manual backup. Only one config file is stored on the server.
:::

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

## Appendix: backup file structure

::: info Backup file structure
The backup file is standard JSON and can be edited manually (do so carefully). 

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

History-related keys:

- `asr_history`: recognition history (JSON array; included unless history recording is disabled)
- `clip_pinned`: pinned clipboard items (non-pinned clipboard history is not exported)
:::

::: warning Privacy
Recognition history contains recognized text. If you are concerned about privacy:

1. enable "Disable recognition history" under `Settings → Other Settings`
2. clear history before exporting
3. or remove the `asr_history` field manually after export
:::
