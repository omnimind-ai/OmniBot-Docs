# Permissions and Storage

This project depends heavily on permissions and local storage layout, so both deserve a dedicated reference page.

## Core permissions

Based on the current Flutter authorization page and `AndroidManifest.xml`, the most important permissions are:

| Permission | Purpose |
| --- | --- |
| Background execution | Reduces process cleanup and helps companion and automation tasks stay alive |
| Overlay permission | Allows the agent to render above other apps |
| Installed apps access | Lets the agent know which target apps are available on the device |
| Accessibility service | Enables real clicks, input, scrolling, and screen reading |

## Additional permissions visible in the manifest

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

Together these support notifications, audio recording, screenshots, alarms, update installs, calendar actions, and foreground-service behavior.

## Shizuku

The authorization page treats `Shizuku` as an advanced capability. A practical interpretation is:

- the core execution chain may not strictly require it
- but broader system-level operations and compatibility can improve when it is available

## Workspace directories

According to `AgentWorkspaceManager.kt`, the app maintains a stable workspace layout:

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

### Why these directories matter

- `SOUL.md`: identity, tone, and behavioral boundaries
- `CHAT.md`: default chat prompt
- `MEMORY.md`: long-term stable memory
- `short-memories/`: daily procedural memory
- `models/`: local model assets

## Database storage

The Room database file name is derived from:

```text
omnibot_cache_databaseoss
```

The current schema version is:

```text
11
```

### Typical entities

- `conversations`
- `messages`
- `agent_conversation_entries`
- `token_usage_records`
- `execution_records`

This shows the app stores not just chat history, but also agent execution traces and token usage locally.

## Lightweight configuration storage

`MMKV` mainly holds:

- MCP enablement, host, port, and token
- UI preferences
- fast-changing lightweight settings

Compared with Room, this is the better fit for frequently updated toggles and runtime flags.

## Default MCP behavior

The local MCP service currently defaults to:

```text
8899
```

and uses Bearer token authentication. For debugging network issues, the first thing to test is usually:

```text
/mcp/health
```

If that does not respond, investigate networking, port exposure, and the enablement switch before you dig into higher-level agent behavior.
