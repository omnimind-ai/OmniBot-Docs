# 配置指南

这一页按“从能跑到好用”的顺序整理：先是构建配置，再是模型、权限、记忆、MCP 和本地模型。

## 1. 构建与签名配置

仓库根目录的 `gradle.properties` 当前包含两个关键方向：

```properties
OMNIBOT_BASE_URL=
omniinfer.backend.executorch_qnn=true
```

### `OMNIBOT_BASE_URL`

- 用于 `develop` 和 `production` 两个 flavor 的 `BASE_URL`。
- 默认留空，适合开源或自托管模式。
- 如果你接入自己的后端，在本地或全局 `~/.gradle/gradle.properties` 里填入即可。

### Release 签名

发布包需要补齐下面这些属性：

```properties
OMNI_RELEASE_STORE_FILE=/abs/path/release.jks
OMNI_RELEASE_STORE_PWD=***
OMNI_RELEASE_KEY_ALIAS=***
OMNI_RELEASE_KEY_PWD=***
```

当前 `release` 构建启用了：

- 资源压缩
- 代码混淆
- V2 / V3 签名

## 2. 模型提供商配置

应用里的模型提供商配置页支持两类协议：

- `OpenAI-compatible`
- `Anthropic`

典型配置项包括：

- Profile 名称
- Base URL
- API Key
- 模型 ID 列表

如果服务端接口支持枚举模型，可以直接拉取远端模型列表；如果不支持，也可以手动维护模型 ID。

## 3. 场景模型绑定

项目不是“一个模型走天下”，而是把不同场景拆成独立绑定项。当前代码里明确可见的场景有：

- `scene.dispatch.model`
- `scene.voice`
- `scene.vlm.operation.primary`
- `scene.compactor.context`
- `scene.compactor.context.chat`
- `scene.loading.sprite`
- `scene.memory.embedding`
- `scene.memory.rollup`

### 推荐分配思路

- `dispatch.model`: 负责任务理解与分流，优先选综合能力强的模型。
- `vlm.operation.primary`: 负责 UI 操作主链路，优先选多模态或视觉模型。
- `compactor.context` / `compactor.context.chat`: 负责上下文压缩，总结类任务可以使用更轻量模型。
- `memory.embedding`: 必须选择真正的 embedding 模型。
- `memory.rollup`: 负责夜间记忆整理，可使用成本更低的总结模型。

## 4. 工作区记忆配置

工作区记忆设置页当前能直接编辑三类文档：

- `SOUL.md`
- `CHAT.md`
- `MEMORY.md`

同时还能控制：

- 记忆 embedding 开关
- 夜间 rollup 开关
- 手动触发一次 rollup

### 真实落盘位置

根据 `AgentWorkspaceManager.kt`，核心文件位于应用工作区下的：

```text
workspace/.omnibot/
├── agent/config.json
├── memory/SOUL.md
├── memory/CHAT.md
├── memory/MEMORY.md
└── memory/short-memories/
```

## 5. 本地模型配置

本地模型页分成两个主标签：

- `service`
- `market`

代码里已经出现的后端标识包括：

- `llama.cpp`
- `omniinfer-mnn`
- `executorch-qnn`

模型目录由宿主统一管理，默认位于：

```text
workspace/.omnibot/models/
├── OmniInfer-llama
├── OmniInfer-mnn
└── OmniInfer-qnn
```

### 什么时候开 QNN

- 设备具备兼容的 Qualcomm NPU 能力时再开。
- 同时需要关注 `omniinfer.backend.executorch_qnn=true` 相关构建与运行条件。

## 6. 本地 MCP 与远端 MCP

### 本地 MCP

设置页里可以启用局域网 MCP 服务。当前实现里默认端口是：

```text
8899
```

启用后会自动生成 Bearer Token，并提供：

- `http://<LAN-IP>:8899/mcp/health`
- `http://<LAN-IP>:8899/webchat/`

它不仅是一个 MCP 入口，也负责：

- conversations
- workspace file
- browser mirror
- agent run timeline

### 远端 MCP

应用还提供独立的 “远端 MCP 工具” 页面，支持：

- 新增服务
- 启用 / 禁用
- 刷新工具列表
- 删除服务

## 7. 权限配置

要让 Agent 真正能执行，核心权限必须尽量配齐：

- 后台运行权限
- 悬浮窗权限
- 应用列表读取
- 无障碍辅助权限

可选增强项：

- 通知与提醒
- `Shizuku`
- 录音
- 日历
- 外部存储 / 文件安装
- 精确闹钟

权限的详细落点和存储说明见 [权限与存储](/reference/permissions-and-storage)。
