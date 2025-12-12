# 备份与恢复

说点啥支持完整的设置备份和恢复功能，包括手动备份/恢复和 WebDAV 自动备份（Pro 功能）。

## 手动备份/恢复

手动备份将所有设置导出为 JSON 文件，可以手动保存和恢复。

### 导出设置

在 `设置 → 备份与恢复 → 导出设置` 中可以将当前配置导出为 JSON 文件。

::: info 版本标识
导出的 JSON 包含 `_version` 字段（当前为 `1`），用于未来版本兼容。
:::

::: warning 敏感信息
导出文件包含所有 API Key、密码等敏感信息，请妥善保管，不要分享给他人或上传到公开位置。
:::

### 导入设置

在 `设置 → 备份与恢复 → 导入设置` 中可以从 JSON 文件恢复配置。

::: tip 选择性恢复
如果只想恢复部分配置，可以手动编辑 JSON 文件，删除不需要恢复的字段。
:::

### 备份文件格式

备份文件是标准的 JSON 格式，可读性好，支持手动编辑。

**示例片段**：

```json
{
  "_version": 1,
  "app_language_tag": "zh-Hans",
  "keyboard_height_tier": 2,
  "asr_vendor": "siliconflow",
  "sf_free_asr_enabled": true,
  "trim_final_trailing_punct": true,
  ...
}
```

::: info 键名规则
配置项键名对应 `Prefs.kt` 中的 `KEY_*` 常量，采用下划线命名法。
:::


## 历史记录备份

### ASR 历史记录

| 配置项             | 类型   | 说明                      |
| ------------------ | ------ | ------------------------- |
| `asr_history_json` | String | 识别历史记录（JSON 数组） |

识别历史记录会包含在备份中（如果未禁用历史记录功能）。

::: warning 隐私提示
历史记录包含所有识别的文本内容，如果担心隐私泄露：

1. 启用 `disableAsrHistory` 禁用历史记录
2. 在备份前手动清除历史记录
3. 或在导出后手动编辑 JSON 文件删除 `asr_history_json` 字段
   :::

### 剪贴板记录

| 配置项              | 类型   | 说明                       |
| ------------------- | ------ | -------------------------- |
| `clip_history_json` | String | 非固定剪贴板记录（不导出） |
| `clip_pinned_json`  | String | 固定的剪贴板记录（导出）   |

仅固定的剪贴板记录会包含在备份中。

## WebDAV 自动备份 <Badge type="warning" text="Pro" />

Pro 版提供 WebDAV 自动备份功能，定期将配置同步到云端。

### 配置 WebDAV

| 配置项           | 类型   | 说明              |
| ---------------- | ------ | ----------------- |
| `webdavUrl`      | String | WebDAV 服务器地址 |
| `webdavUsername` | String | WebDAV 用户名     |
| `webdavPassword` | String | WebDAV 密码       |

在 `设置 → 备份与恢复 → WebDAV 设置（Pro）` 中配置服务器信息。

### 自动备份

Pro 版支持定时自动备份，由 `AutoBackupWorker` 实现。

**备份策略**：

- 使用 Android WorkManager 调度
- 支持设置备份频率（每天/每周/每月）

### 手动备份到 WebDAV

`设置 → 备份与恢复 → 立即备份到 WebDAV`

### 从 WebDAV 恢复

`设置 → 备份与恢复 → 从 WebDAV 恢复`

## 故障排查

### 导入失败

**可能原因**：

1. JSON 格式错误：文件损坏或编辑错误
2. 版本不兼容：来自未来版本的备份文件
3. 配置值超出范围：手动编辑时输入了非法值

**解决方法**：

- 使用 JSON 验证工具检查格式
- 确保文件完整未损坏
- 不要手动修改不熟悉的字段

### WebDAV 备份失败

**可能原因**：
- 检查网络连接和 WebDAV 配置
- 在浏览器中测试 WebDAV 连接
- 清理服务器上的旧备份文件
- 查看错误提示信息