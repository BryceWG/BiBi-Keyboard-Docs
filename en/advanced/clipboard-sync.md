# Clipboard Sync

Clipboard sync is based on the [SyncClipboard](https://github.com/Jeric-X/SyncClipboard) protocol. BiBi Keyboard acts as a SyncClipboard client: it syncs clipboard content by accessing the server's `SyncClipboard.json` (and optionally the `/file/` directory).

The current version is compatible with the newer SyncClipboard text-sync protocol (3.11.1 and above). If you also use the desktop client, keeping the desktop client and server reasonably up to date is recommended.

You can use any of the following backends as a "server":

- **SyncClipboard dedicated server** (SyncClipboard.Server)
- **Desktop SyncClipboard built-in server**
- **WebDAV / cloud storage** (as long as it supports HTTP PUT/GET)

Currently, BiBi Keyboard mainly syncs **text**. If the server pushes images/files, the file name will be shown in clipboard history or the keyboard status bar, and you can tap to download if needed.

## What it does

Clipboard sync service provides:

- **Auto upload**: on local clipboard changes, `PUT` to server `SyncClipboard.json`
- **Auto download**: periodically `GET` server `SyncClipboard.json` and apply new content locally
- **Deduplication**: uses content hash to avoid uploading duplicates
- **File name dedup**: remembers recent file names to avoid repeated previews

::: info How it works

- Upload: uses **SHA-256** hash of content to decide whether upload is needed
- Download: remembers the last handled file name to avoid duplicate processing
- Protocol basics:
  - `PUT /SyncClipboard.json` upload
  - `GET /SyncClipboard.json` pull
  - if `Type` is `Image`/`File`, the file is under `/file/<filename>`

:::

## Configuration

### Master switch

| Key                  | Type    | Default | Description                 |
| ------------------- | ------- | ------- | --------------------------- |
| `syncClipboardEnabled` | Boolean | false  | enable clipboard sync service |

Enable it in `Settings → Other Settings → Clipboard sync`.

When enabled, the settings page reports the active execution mode:

| Mode | Requirement | Background behavior |
|------|-------------|---------------------|
| BiBi default IME | BiBi Keyboard is the current default IME | Direct clipboard access continues after the panel is hidden while the IME service remains alive |
| IME Bridge assisted | A third-party IME is default and IME Bridge 0.2.4+ reports clipboard support | The target IME process reads/writes/observes the system clipboard; server credentials and HTTP remain in BiBi Keyboard |
| Manual only | Neither privileged path is available | Floating-ball manual upload/pull remains available; background auto-sync is not guaranteed |

::: warning IME Bridge lifecycle
Assisted sync depends on the target IME process remaining alive. It pauses when Android kills that process and automatically renews its subscription after the IME is opened again. It is not an always-on daemon.
:::

### Clear in-app clipboard history

To remove all clipboard items saved by BiBi Keyboard, open `Settings → Other Settings`, tap “Clear clipboard history,” and confirm. This deletes both regular and pinned items, but it does not clear the current system clipboard or delete history stored on the sync server.

### Server config (SyncClipboard)

| Key                         | Type   | Required | Description                                         |
| -------------------------- | ------ | -------- | --------------------------------------------------- |
| `syncClipboardServerBase`  | String | ✓        | server base URL or full `SyncClipboard.json` URL    |
| `syncClipboardUsername`    | String | ✓        | username (HTTP Basic Auth)                          |
| `syncClipboardPassword`    | String | ✓        | password (HTTP Basic Auth)                          |

The server address can be either a base URL or the full file URL:

- Base URL examples: `https://example.com:5033/`, `https://dav.jianguoyun.com/dav/`
- Full URL example: `https://example.com:5033/SyncClipboard.json`

If the URL does not end with `.json`, the app automatically appends `/SyncClipboard.json`.

::: warning Note
All fields are auto-trimmed (`trim()`). Make sure you did not paste extra spaces.
:::

### Auto pull

| Key                           | Type    | Range | Default | Description            |
| ---------------------------- | ------- | ----- | ------- | ---------------------- |
| `syncClipboardAutoPullEnabled` | Boolean | -     | false   | enable auto pull       |
| `syncClipboardPullIntervalSec` | Int     | 1-600 | 15      | pull interval (seconds) |

When enabled, the app periodically checks and syncs cloud clipboard content.

::: tip Suggested intervals

- **15-30s**: near real-time sync
- **60-120s**: balance real-time and battery usage
- **300-600s**: low frequency, saves power and data

:::

## Available servers/backends

### SyncClipboard dedicated server (recommended)

SyncClipboard provides a standalone server `SyncClipboard.Server`, cross-platform and compatible with desktop/mobile clients. See upstream docs for deployment details.

Example:

```
Server: https://your-domain.com:5033/
Username: UserName in appsettings.json
Password: Password in appsettings.json
```

### Desktop built-in server

Desktop clients for Windows/macOS/Linux can run a built-in server. Enable it in the client settings and use the displayed address here.

### WebDAV server (optional)

If you want to use WebDAV/cloud storage as backend, it only needs to support HTTP PUT/GET to `SyncClipboard.json` (typically via Basic Auth). Below is a common example.

### Jianguoyun (Nutstore)

Jianguoyun is a popular WebDAV provider. Quota/pricing depend on their official plans.

Example:

```
Server: https://dav.jianguoyun.com/dav/
Username: your Jianguoyun account (email)
Password: app-specific password
```

::: warning Important
Jianguoyun does not allow WebDAV access with your login password. You must generate an **app password** under Account settings → Security → Third-party apps.
:::

Steps:

1. Log in to Jianguoyun web
2. Open Account settings → Security
3. Find Third-party apps
4. Add an app (e.g. "BiBi Keyboard")
5. Use the generated password as WebDAV password

## Use cases

### Phone ↔ PC text transfer

1. Copy text on phone
2. App uploads to server automatically
3. PC SyncClipboard client syncs
4. Paste on PC

### Multi-phone sync

1. Copy on Phone A
2. Phone B pulls and updates its clipboard
3. Paste on Phone B

### Cross-app sharing

1. Copy a link/text in one app
2. Switch device/app
3. Paste directly without manual transfer

## Permissions

- **Network access**: connect to the server/backend
- **Read clipboard**: detect clipboard changes and read content
- **Write clipboard**: apply synced content to local clipboard

## Troubleshooting

### Cannot connect to server

Possible causes:

1. Server URL wrong
   - ensure scheme `https://` / `http://`
   - ensure path is correct (Jianguoyun must end with `/dav/`)
2. Wrong username/password
   - Jianguoyun requires an app password
   - check for extra spaces
3. Network issues
   - check device connectivity
   - try opening the URL in a browser

### Upload failed

Possible causes:

1. permission: account has no write access
2. app in background and cannot write clipboard
3. timeout: unstable network or slow server

Fix:

- verify account permissions
- delete old files on server to free space
- switch to a more stable network

### Download not applied

Possible causes:

1. auto pull disabled (`syncClipboardAutoPullEnabled = false`)
2. interval too long
3. app in background and cannot write clipboard

Fix:

- enable auto pull and shorten interval
- disable battery optimization for the app
- manually trigger sync ("Sync now" button in settings)
