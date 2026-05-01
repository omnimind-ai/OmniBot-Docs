# Configuration

This page is organized from “make it run” to “make it useful”: build settings first, then providers, scenes, memory, MCP, and local models.

## 1. Build and signing configuration

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

## 2. Model provider profiles

The provider configuration UI supports two protocol families:

- `OpenAI-compatible`
- `Anthropic`

Typical fields include:

- profile name
- base URL
- API key
- model ID list

If the backend can enumerate models, the app can pull them remotely. If not, you can maintain model IDs manually.

## 3. Scene model bindings

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

## 4. Workspace memory

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

## 5. Local models

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

## 6. Local MCP and remote MCP

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

## 7. Permissions

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
