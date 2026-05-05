# 开发指南

这一页把原来的“快速开始”和“配置指南”合并到一条开发路径里：先让工程跑起来，再补齐构建、模型、权限、记忆、MCP 和本地模型配置。

::: tip
本页内容以当前代码仓库为准，优先参考真实的 `build.gradle.kts`、`settings.gradle.kts`、`pubspec.yaml` 和源码目录，而不是历史说明。
:::

## 1. 环境要求

OmnibotApp 是一个面向安卓设备的 AI Agent 应用，采用 `Kotlin + Flutter` 混合架构。它不是单纯聊天应用，而是围绕“理解、决策、执行、反馈”构建的可操作型 Agent。

- JDK `11+`
- Flutter SDK `3.9.2+`
- Android SDK `compileSdk 36`
- Node.js `18+`，仅用于运行这个独立的 VitePress 文档站

## 2. 获取源码

```bash
git clone https://github.com/omnimind-ai/OpenOmniBot.git
cd OpenOmniBot
```

## 3. 初始化必须的子模块

项目当前直接依赖 `third_party/omniinfer`，至少需要先初始化下面这些内容：

```bash
git submodule update --init third_party/omniinfer
git -C third_party/omniinfer submodule update --init framework/mnn
git -C third_party/omniinfer submodule update --init framework/llama.cpp
```

如果未来你要重点使用 Qualcomm NPU 方案，再继续关注 `ExecuTorch QNN` 对应能力即可。

## 4. 初始化 Flutter 模块

```bash
cd ui
flutter pub get
```

如果 Flutter 报出：

```text
Could not read script '.../ui/.android/include_flutter.groovy'
```

执行下面两条即可：

```bash
flutter clean
flutter pub get
```

## 5. 构建 Android 调试包

回到仓库根目录后执行：

```bash
./gradlew assembleDevelopDebug
```

如果需要直接安装到设备：

```bash
./gradlew installDevelopDebug
```

## 6. 常用验证命令

### Android / Gradle

```bash
./gradlew test
./gradlew lint
```

### Flutter

```bash
cd ui
flutter test
flutter analyze
```

## 7. 当前工程里你需要知道的真实构建事实

- Android `applicationId`: `cn.com.omnimind.bot`
- `minSdk`: `29`
- `targetSdk`: `34`
- `compileSdk`: `36`
- 当前 `app` 模块版本号来自 `app/build.gradle.kts`：
  - `versionCode = 1`
  - `versionName = "0.3.9"`
- 产品风味有两个：
  - `develop`
  - `production`

## 8. 构建与签名配置

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

## 9. 模型提供商配置

应用里的模型提供商配置页支持两类协议：

- `OpenAI-compatible`
- `Anthropic`

典型配置项包括：

- Profile 名称
- Base URL
- API Key
- 模型 ID 列表

如果服务端接口支持枚举模型，可以直接拉取远端模型列表；如果不支持，也可以手动维护模型 ID。

## 10. 场景模型绑定

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

## 11. 工作区记忆配置

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

## 12. 本地模型配置

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

## 13. 本地 MCP 与远端 MCP

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

## 14. 权限配置

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

## 15. 文档站运行方式

这个文档仓是独立仓库，和主工程分开部署。进入文档仓根目录后执行：

```bash
npm install
npm run docs:dev
```

构建静态站点：

```bash
npm run docs:build
npm run docs:preview
```

下一步可以继续看 [首次启动教程](/tutorials/first-run) 和 [模型与场景配置](/tutorials/model-setup)。
