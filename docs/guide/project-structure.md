# 项目结构

OmnibotApp 当前是一套混合式安卓 Agent 工程。最值得先理解的不是页面，而是模块职责边界。

## 目录总览

```text
OmnibotApp/
├── app/                 # Android 宿主：入口、服务、MCP、调度、终端预热
├── ui/                  # Flutter UI：聊天、设置、模型、工作区、记忆、权限引导
├── baselib/             # Room、MMKV、网络、工具类、模型基础配置
├── assists/             # 任务状态机、任务管理、执行编排
├── accessibility/       # 无障碍服务、截图、MediaProjection、界面树采集
├── omniintelligence/    # AI 能力抽象层与协议模型
├── uikit/               # 原生浮层 UI
├── third_party/omniinfer/
└── ReTerminal/core/     # 终端体验相关模块
```

## 模块职责

| 模块 | 主要职责 |
| --- | --- |
| `app` | Application 初始化、工作区创建、技能种子、MCP 恢复、终端 warmup、Flutter Web bundle 同步 |
| `ui` | 所有高频交互页面，尤其是聊天、场景模型、技能商店、本地模型、工作区、MCP 配置 |
| `baselib` | 本地数据库、存储、日志、模型场景基础能力 |
| `assists` | `AssistsCore` 对外接口、`StateMachine` 状态机、任务执行与取消 |
| `accessibility` | 自动点击、输入、滚动、截图、屏幕状态监听 |
| `omniintelligence` | 智能任务协议、请求与响应数据模型 |
| `uikit` | 悬浮球、半屏/覆盖层等原生 UI 外壳 |
| `third_party/omniinfer` | 本地模型运行时和服务侧集成 |
| `ReTerminal/core` | 内嵌终端相关组件 |

## 宿主启动时做了什么

`App.kt` 里的初始化顺序非常关键，当前至少包含：

1. 应用语言和基础 Application 初始化。
2. `MMKV` 初始化。
3. `Room` 数据库初始化。
4. `OmniInferServer` 和本地模型桥接初始化。
5. `AgentWorkspaceManager` 创建工作区与默认文档。
6. 内置技能种子写入。
7. AI 配置同步、记忆 rollup 调度、定时任务恢复。
8. `McpServerManager.restoreIfEnabled()` 恢复本地 MCP。
9. 终端运行时预热。

## Flutter 与 Android 的嵌入方式

项目不是单 Activity 里简单塞一个 FlutterView，而是显式维护：

- `FlutterEngineGroup`
- 缓存主引擎
- 通过 `subEngineMain` 创建次级引擎

这样做的好处是：

- 减少多页面 / 多场景切换时的启动成本
- 让原生和 Flutter 的协同更稳定
- 便于工作区、悬浮层、聊天页等多路场景复用 Flutter 能力

## 任务执行主线

`assists/StateMachine.kt` 和 `assists/AssistsCore.kt` 负责把 UI 请求转成可执行任务：

- 初始化无障碍控制器
- 创建并启动任务
- 跟踪 companion / chat / scheduled task 状态
- 接收用户补充输入
- 写入外部记忆或优先事件
- 取消、完成或立即执行计划任务

如果你要做业务扩展，通常先从这两个类开始看。

## 相关页面入口

Flutter 侧当前可见的重要页面包含：

- `/home/chat`
- `/home/settings`
- `/home/skill_store`
- `/home/omnibot_workspace`
- `/home/mcp`
- `/home/permission_guide`
- `/home/local_models`
- `/home/scene_model_setting`
- `/home/vlm_model_setting`

下一页建议接着看 [功能总览](/features/overview)。
