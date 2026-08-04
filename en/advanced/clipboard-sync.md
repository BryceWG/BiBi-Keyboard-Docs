# Clipboard Sync

Clipboard sync is based on the [SyncClipboard](https://github.com/Jeric-X/SyncClipboard) protocol. BiBi Keyboard acts as a SyncClipboard client: it syncs clipboard content by accessing the server's `SyncClipboard.json` (and optionally the `/file/` directory).

The current version is compatible with the newer SyncClipboard text-sync protocol (3.11.1 and above). If you also use the desktop client, keeping the desktop client and server reasonably up to date is recommended.

You can use any of the following backends as a "server":

- **SyncClipboard dedicated server** (SyncClipboard.Server)
- **Desktop SyncClipboard built-in server**
- **WebDAV / cloud storage** (as long as it supports HTTP PUT/GET)

The current version syncs **text, images, and files**. Image and file sync can be enabled independently; eligible remote attachments are downloaded automatically to the system `Download/BiBi` folder.

## What it does

Clipboard sync service provides:

- **Auto upload**: on local clipboard changes, `PUT` to server `SyncClipboard.json`
- **Automatic receive**: uses Realtime when the server supports it, otherwise pulls at the configured interval
- **Attachment download**: downloads remote attachments according to the image/file switches and size limit, with system progress/result notifications
- **Attachment upload**: watches a selected folder for new files or uploads one file from Android's share sheet
- **Deduplication**: uses content hash to avoid uploading duplicates
- **File name dedup**: remembers recent file names to avoid repeated previews

An independent background service manages sync, so the floating ball does not need to be running. Android can still reclaim background processes; see “Keep background realtime connection” below if you need longer-lived receiving.

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
| BiBi default IME | BiBi Keyboard is the current default IME | The independent sync service runs the connection; BiBi Keyboard reads and writes the system clipboard |
| Modified Fcitx5 / Trime assisted | The latest modified Fcitx5 or Trime is in use and “BiBi Keyboard clipboard sync” is enabled in that IME | BiBi Keyboard connects to the server; the current IME reads/writes/observes the system clipboard |
| IME Bridge assisted | A third-party IME is default and IME Bridge 0.2.4+ reports clipboard support | The independent sync service connects to the server; the target IME only reads/writes/observes the system clipboard, and credentials remain in BiBi Keyboard |
| Manual only | No automatic path is available | Floating-ball manual upload/pull remains available; background auto-sync is not guaranteed |

### Modified Fcitx5 / Trime setup

1. Install the latest [modified Fcitx5](https://github.com/BryceWG/fcitx5-android-bibi-keyboard/releases) or [modified Trime](https://github.com/BryceWG/trime-bibi-keyboard/releases)
2. Configure the server and enable sync under `BiBi Keyboard Settings → Other Settings → Clipboard sync`
3. Open the modified IME's clipboard settings and enable “BiBi Keyboard clipboard sync”
4. Open that keyboard once, then confirm its clipboard settings show “observing clipboard changes”

Both switches are required. The modified IME tries Pro first, then OSS.

::: warning Modified IME lifecycle
This path works only while the corresponding IME service is running. If the status says the IME service is stopped or waiting for the keyboard window, open the keyboard once. It reconnects when the keyboard is opened again after Android reclaims its process.
:::

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

The server address can be either a base URL(recommended) or the full file URL:

- Base URL example: `https://example.com:5033/`; Webdav server (e.g. Jianguoyun) work-directory example: `https://dav.jianguoyun.com/dav/SyncClipboard`
- Full URL example: `https://example.com:5033/SyncClipboard.json`

If the URL does not end with `.json`, the app automatically appends `/SyncClipboard.json`. The Webdav server example therefore accesses `https://dav.jianguoyun.com/dav/SyncClipboard/SyncClipboard.json`.

To sync files or attachments, enter the directory base URL rather than the full `SyncClipboard.json` URL, because files are accessed from that directory's `file/` path. The Webdav server example above is such a URL.

::: warning Note
All fields are auto-trimmed (`trim()`). Make sure you did not paste extra spaces.
:::

### Automatic receive

| Setting | Range | Default | Description |
|---------|-------|---------|-------------|
| Automatic receive | On/off | Off | Detects server capability automatically: Realtime when supported, otherwise periodic pull |
| Keep background realtime connection | On/off | Off | Shown only when the server supports Realtime; tries to keep the connection after related screens or services exit |
| Periodic pull interval | 1-600 seconds | 15 seconds | Used when Realtime is unsupported or its connection is temporarily unavailable |

The settings page reports whether capability detection, Realtime, or periodic pull is active. Changing the server URL or credentials triggers detection again.

::: warning Background limits
“Keep background realtime connection” uses additional battery and network resources and cannot bypass Android process limits. When off, Realtime stays active only while the app, IME, or IME Bridge related service is active; even when on, system battery policies may still interrupt it.
:::

::: tip Suggested intervals

- **15-30s**: near real-time sync
- **60-120s**: balance real-time and battery usage
- **300-600s**: low frequency, saves power and data

:::

### Image and file sync

Under `Settings → Other Settings → Clipboard sync`, enable `Sync images` and/or `Sync files`. When either is enabled, you can also configure:

| Setting | Range | Description |
|---------|-------|-------------|
| Attachment size limit | 1-1024 MB | Applied to both uploads and downloads |
| Watched folder | Optional folder | Automatically uploads the latest new eligible attachment added later |

Without a watched folder, attachment downloads and manual share-sheet uploads still work. When a folder is selected for the first time, existing files are marked as handled instead of being uploaded in bulk; only files added afterward are considered. `Download/BiBi` is reserved for downloaded attachments and cannot also be watched, which prevents upload loops.

Downloaded attachments are saved in `Download/BiBi`. Android notifications show upload/download progress and the final result.

### Upload from the Android share sheet

1. Enable Clipboard Sync and the matching `Sync images` or `Sync files` switch
2. Share one file from a file manager, gallery, or another app
3. Choose `Upload to Clipboard Sync` in the Android share sheet
4. Wait for the upload result notification

Only one shared file is handled at a time, and the attachment size limit still applies.

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

First, create a dedicated folder in your Jianguoyun root, for example `SyncClipboard`; if you want to sync files, create a `file` subdirectory in `SyncClipboard`. Use an English, space-free name where possible. Folder names containing Chinese characters or spaces must be URL-encoded in the server address.

Example:

```
Server: https://dav.jianguoyun.com/dav/SyncClipboard
Username: your Jianguoyun registration email
Password: Jianguoyun third-party app password
```

::: warning Important
Do not add a trailing `/`, and do not use only `https://dav.jianguoyun.com/dav/`: the URL must point to an existing dedicated working directory. Jianguoyun does not allow WebDAV access with your login password. Generate a third-party app password under **Account information → Security options → Third-party app management → Add app password**.
:::

Steps:

1. Log in to Jianguoyun web
2. Create the `SyncClipboard` folder in the root directory
3. To sync files, create a `file` subdirectory in `SyncClipboard` (optional)
4. Open Account information → Security options → Third-party app management
5. Add an app password (for example, “BiBi Keyboard”)
6. Use the generated password as the WebDAV password

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
   - the Jianguoyun URL must point to an existing work directory, for example `https://dav.jianguoyun.com/dav/SyncClipboard`, without a trailing `/`
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

1. Automatic receive is disabled
2. interval too long
3. app or IME Bridge cannot write the clipboard in the background

Fix:

- enable Automatic receive; if the status shows periodic pull, shorten the interval
- disable battery optimization for the app
- tap “Validate” in settings to check the URL and credentials
