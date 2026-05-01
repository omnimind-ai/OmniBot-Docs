# 权限与存储

这个项目的执行能力非常依赖权限和本地落盘结构，所以单独整理一页。

## 核心权限

从当前 Flutter 授权页和 `AndroidManifest.xml` 来看，最关键的是这几类：

| 权限 | 作用 |
| --- | --- |
| 后台运行 | 降低系统回收概率，保证陪伴与自动任务持续运行 |
| 悬浮窗 | 让 Agent 能在其他应用之上显示交互层 |
| 应用列表读取 | 判断当前设备上有哪些可操作目标应用 |
| 无障碍服务 | 真正执行点击、输入、滚动、页面读取 |

## Manifest 里还能看到的扩展权限

- `POST_NOTIFICATIONS`
- `REQUEST_IGNORE_BATTERY_OPTIMIZATIONS`
- `QUERY_ALL_PACKAGES`
- `RECORD_AUDIO`
- `SYSTEM_ALERT_WINDOW`
- `READ_MEDIA_IMAGES`
- `MANAGE_EXTERNAL_STORAGE`
- `REQUEST_INSTALL_PACKAGES`
- `SCHEDULE_EXACT_ALARM`
- `READ_CALENDAR`
- `WRITE_CALENDAR`
- `FOREGROUND_SERVICE_*`

这些权限共同支撑了通知、录音、截图、定时、安装包更新、日历与前台服务能力。

## Shizuku

在授权设置页里，`Shizuku` 被定义为“扩展能力”。建议理解成：

- 核心链路不一定强依赖它
- 但一些系统级能力、兼容性和进阶动作会更完整

## 工作区目录

根据 `AgentWorkspaceManager.kt`，工作区会维护一套固定结构：

```text
workspace/
├── attachments/
├── workspace/
├── public/
├── shared/
├── offloads/
├── browser/
└── .omnibot/
    ├── agent/config.json
    ├── memory/
    │   ├── SOUL.md
    │   ├── CHAT.md
    │   ├── MEMORY.md
    │   ├── short-memories/
    │   └── index/
    ├── skills/
    └── models/
        ├── OmniInfer-llama/
        ├── OmniInfer-mnn/
        └── OmniInfer-qnn/
```

### 这些目录为什么重要

- `SOUL.md`: Agent 身份、语气、边界
- `CHAT.md`: 默认对话提示
- `MEMORY.md`: 长期稳定记忆
- `short-memories/`: 过程性短期记忆
- `models/`: 本地模型资产

## 数据库存储

Room 数据库名称来自：

```text
omnibot_cache_databaseoss
```

当前数据库版本是：

```text
11
```

### 典型实体

- `conversations`
- `messages`
- `agent_conversation_entries`
- `token_usage_records`
- `execution_records`

这说明应用已经把“聊天内容”、“Agent 执行记录”和“Token 消耗”都纳入本地数据模型。

## 轻量配置存储

`MMKV` 主要承担：

- MCP 开关、主机、端口、token
- UI 侧偏好项
- 快速切换配置

比起 Room，它更适合频繁读写的小配置。

## MCP 默认行为

本地 MCP 服务当前默认端口为：

```text
8899
```

并使用 Bearer Token 鉴权。对排查网络问题来说，最先验证的通常是：

```text
/mcp/health
```

如果这一步不通，先看网络、端口和开关状态，不要急着排查上层 Agent 逻辑。
