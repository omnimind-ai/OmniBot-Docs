# Development Guide

This page merges the previous “Getting Started” and “Configuration” pages into one development path: get the project running first, then wire build settings, models, permissions, memory, MCP, and local inference.

::: tip
This page follows the current repository code. When older notes conflict with real files such as `build.gradle.kts`, `settings.gradle.kts`, or `pubspec.yaml`, trust the code first.
:::

## 1. Requirements

OmnibotApp is an Android AI agent project built with a `Kotlin + Flutter` hybrid architecture. It is designed for the full execution loop of understanding, deciding, acting, and reflecting instead of functioning as a chat-only app.

- JDK `11+`
- Flutter SDK `3.9.2+`
- Android SDK with `compileSdk 36`
- Node.js `18+` only for running this standalone VitePress documentation site

## 2. Clone the source

```bash
git clone https://github.com/omnimind-ai/OpenOmniBot.git
cd OpenOmniBot
```

## 3. Initialize the required submodules

The project currently depends directly on `third_party/omniinfer`, so at minimum initialize these pieces:

```bash
git submodule update --init third_party/omniinfer
git -C third_party/omniinfer submodule update --init framework/mnn
git -C third_party/omniinfer submodule update --init framework/llama.cpp
```

If you plan to focus on Qualcomm NPU flows later, you can then look deeper into the ExecuTorch QNN path.

## 4. Initialize the Flutter module

```bash
cd ui
flutter pub get
```

If Flutter reports:

```text
Could not read script '.../ui/.android/include_flutter.groovy'
```

run:

```bash
flutter clean
flutter pub get
```

## 5. Build the Android debug app

Back at the repository root:

```bash
./gradlew assembleDevelopDebug
```

To install directly on a device:

```bash
./gradlew installDevelopDebug
```

## 6. Common verification commands

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

## 7. Important build facts from the current codebase

- Android `applicationId`: `cn.com.omnimind.bot`
- `minSdk`: `29`
- `targetSdk`: `34`
- `compileSdk`: `36`
- Current app version in `app/build.gradle.kts`:
  - `versionCode = 1`
  - `versionName = "0.3.9"`
- Product flavors:
  - `develop`
  - `production`

## 8. Build and signing configuration

The root `gradle.properties` currently exposes two key directions:

```properties
OMNIBOT_BASE_URL=
omniinfer.backend.executorch_qnn=true
```

### `OMNIBOT_BASE_URL`

- It feeds the `BASE_URL` field for both `develop` and `production` flavors.
- It is empty by default, which fits open-source or self-hosted setups.
- If you have your own backend, set it in local `gradle.properties` or global `~/.gradle/gradle.properties`.

### Release signing

Release builds need these properties:

```properties
OMNI_RELEASE_STORE_FILE=/abs/path/release.jks
OMNI_RELEASE_STORE_PWD=***
OMNI_RELEASE_KEY_ALIAS=***
OMNI_RELEASE_KEY_PWD=***
```

The current `release` build enables:

- resource shrinking
- code shrinking / obfuscation
- V2 and V3 signatures

## 9. Model provider profiles

The provider configuration UI supports two protocol families:

- `OpenAI-compatible`
- `Anthropic`

Typical fields include:

- profile name
- base URL
- API key
- model ID list

If the backend can enumerate models, the app can pull them remotely. If not, you can maintain model IDs manually.

## 10. Scene model bindings

The app does not treat the agent as a one-model system. The current code exposes these scene IDs:

- `scene.dispatch.model`
- `scene.voice`
- `scene.vlm.operation.primary`
- `scene.compactor.context`
- `scene.compactor.context.chat`
- `scene.loading.sprite`
- `scene.memory.embedding`
- `scene.memory.rollup`

### Recommended mapping strategy

- `dispatch.model`: task understanding and routing, so use a strong general model.
- `vlm.operation.primary`: the main UI action chain, so prefer a multimodal or vision-capable model.
- `compactor.context` and `compactor.context.chat`: context compression, usually a lighter summarization model is enough.
- `memory.embedding`: must be a real embedding model.
- `memory.rollup`: nightly memory consolidation can usually run on a cheaper summarization model.

## 11. Workspace memory

The workspace memory page can directly edit:

- `SOUL.md`
- `CHAT.md`
- `MEMORY.md`

It also controls:

- the embedding toggle
- the nightly rollup toggle
- manual rollup execution

### Real storage location

According to `AgentWorkspaceManager.kt`, the core files live under:

```text
workspace/.omnibot/
├── agent/config.json
├── memory/SOUL.md
├── memory/CHAT.md
├── memory/MEMORY.md
└── memory/short-memories/
```

## 12. Local models

The local models page is split into two primary tabs:

- `service`
- `market`

The current backend identifiers visible in code are:

- `llama.cpp`
- `omniinfer-mnn`
- `executorch-qnn`

The host manages model directories under:

```text
workspace/.omnibot/models/
├── OmniInfer-llama
├── OmniInfer-mnn
└── OmniInfer-qnn
```

### When to enable QNN

- Only when your target device has compatible Qualcomm NPU support.
- Keep the related build and runtime constraints in mind together with `omniinfer.backend.executorch_qnn=true`.

## 13. Local MCP and remote MCP

### Local MCP

The settings page can enable a LAN MCP server. The current default port is:

```text
8899
```

When enabled, it generates a Bearer token and exposes endpoints such as:

- `http://<LAN-IP>:8899/mcp/health`
- `http://<LAN-IP>:8899/webchat/`

This service is more than a single MCP endpoint. It also fronts:

- conversations
- workspace files
- browser mirroring
- agent run timeline

### Remote MCP

The app also includes a dedicated remote MCP tools page that lets you:

- add a service
- enable or disable it
- refresh the tool list
- delete it

## 14. Permissions

To make the agent truly executable, these core permissions should be completed first:

- background execution
- overlay permission
- installed apps access
- accessibility service

Optional enhancements include:

- notifications
- `Shizuku`
- audio recording
- calendar
- external storage / package install
- exact alarms

For details, see [Permissions and Storage](/en/reference/permissions-and-storage).

## 15. Running this docs site

Inside the docs repository:

```bash
npm install
npm run docs:dev
```

To build the static site:

```bash
npm run docs:build
npm run docs:preview
```

The next useful pages are [First Run](/en/tutorials/first-run) and [Model and Scene Setup](/en/tutorials/model-setup).
