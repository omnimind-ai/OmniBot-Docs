# Project Structure

OmnibotApp is currently a hybrid Android agent codebase. The most useful first step is to understand module boundaries instead of starting from screens alone.

## Directory overview

```text
OmnibotApp/
├── app/                 # Android host: entry point, services, MCP, schedulers, terminal warmup
├── ui/                  # Flutter UI: chat, settings, models, workspace, memory, permission guides
├── baselib/             # Room, MMKV, networking, utility helpers, base model config
├── assists/             # Task state machine, task management, execution orchestration
├── accessibility/       # Accessibility service, screenshots, MediaProjection, UI tree capture
├── omniintelligence/    # AI abstraction layer and protocol models
├── uikit/               # Native overlay UI
├── third_party/omniinfer/
└── ReTerminal/core/     # Embedded terminal modules
```

## Module responsibilities

| Module | Main role |
| --- | --- |
| `app` | Application bootstrapping, workspace creation, built-in skill seeding, MCP restore, terminal warmup, Flutter Web bundle sync |
| `ui` | High-frequency user-facing screens such as chat, scene models, skill store, local models, workspace, and MCP config |
| `baselib` | Local database, storage, logging, and foundational model-scene support |
| `assists` | Public `AssistsCore` API, the `StateMachine`, and task execution / cancellation |
| `accessibility` | Automated click, input, scroll, screenshot, and screen-state monitoring |
| `omniintelligence` | Intelligent task protocols and request/response data models |
| `uikit` | Floating ball, half-screen, and overlay shell UI |
| `third_party/omniinfer` | Local runtime and inference-side integration |
| `ReTerminal/core` | Embedded terminal experience |

## What happens on app startup

`App.kt` is the key assembly point. It currently handles at least:

1. app locale and base application setup
2. `MMKV` initialization
3. `Room` database initialization
4. `OmniInferServer` and local model bridge setup
5. workspace creation and default document initialization through `AgentWorkspaceManager`
6. built-in skill seeding
7. AI config sync, memory rollup scheduling, and scheduled task restore
8. local MCP restore through `McpServerManager.restoreIfEnabled()`
9. embedded terminal warmup

## Flutter and Android embedding

The project does more than place a single Flutter view into one Activity. It explicitly manages:

- `FlutterEngineGroup`
- a cached main engine
- secondary engines launched through `subEngineMain`

This helps with:

- lower startup cost across multiple scenes
- more stable native / Flutter coordination
- reuse across workspace, overlays, and chat-related surfaces

## Main execution line

`assists/StateMachine.kt` and `assists/AssistsCore.kt` convert UI requests into runnable tasks:

- initialize the accessibility controller
- create and start tasks
- track companion, chat, and scheduled task state
- receive user follow-up input
- append external memory or priority events
- cancel, finish, or run scheduled tasks immediately

If you plan to extend behavior, these are strong starting points.

## Important Flutter routes

The Flutter side currently exposes notable pages such as:

- `/home/chat`
- `/home/settings`
- `/home/skill_store`
- `/home/omnibot_workspace`
- `/home/mcp`
- `/home/permission_guide`
- `/home/local_models`
- `/home/scene_model_setting`
- `/home/vlm_model_setting`

The next page to read is [Features Overview](/en/features/overview).
