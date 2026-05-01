---
layout: home

hero:
  name: Omnibot
  text: Your On-Device AI Assistant
  tagline: Covering setup, configuration, features, tutorials, and architecture notes 
  image:
    src: /assets/app-logo.png
    alt: App logo
  actions:
    - theme: brand
      text: Getting Started
      link: /en/guide/getting-started
    - theme: alt
      text: View Configuration
      link: /en/guide/configuration

features:
  - title: Native Android + Flutter hybrid stack
    details: The Android host manages services, permissions, MCP, the terminal runtime, and system integrations, while Flutter drives chat, settings, models, and workspace UI.
  - title: Execution-first agent loop
    details: The project is built around understanding, routing, acting, compacting context, and feeding results back into memory instead of stopping at chat.
  - title: System-level mobile automation
    details: Accessibility, MediaProjection, overlays, and foreground services work together so the agent can operate real Android interfaces.
  - title: Remote and local models together
    details: Scene bindings support OpenAI-compatible and Anthropic providers, while local inference supports llama.cpp, MNN, and QNN backends.
  - title: Workspace, skills, and terminal
    details: Workspace browsing, artifact preview, built-in skills, and an embedded terminal make the app feel more like an execution environment than a simple assistant.
  - title: MCP and WebChat interfaces
    details: The app can expose a LAN MCP server, WebChat pages, browser mirroring, and remote MCP tool integrations.
---

## What this documentation helps with

- It gets you from a fresh checkout to a successful Android build quickly.
- It explains how the Kotlin, Flutter, and AI execution layers fit together.
- It walks you through permissions, models, scenes, skills, and workspace setup.
- It gives contributors a fast way to locate the key modules, configs, and storage paths.

<div class="metric-grid">
  <div>
    <strong>Android host</strong><br>
    App, services, MCP, foreground capabilities
  </div>
  <div>
    <strong>Flutter UI</strong><br>
    Chat, settings, models, workspace
  </div>
  <div>
    <strong>Assists state machine</strong><br>
    Task lifecycle and execution orchestration
  </div>
  <div>
    <strong>Local capabilities</strong><br>
    Memory, skills, local models, terminal
  </div>
</div>

![Omnibot example interface](/assets/example.png)

## Suggested reading order

1. Start with [Getting Started](/en/guide/getting-started) to verify dependencies and build commands.
2. Continue with [Configuration](/en/guide/configuration) to wire models, permissions, MCP, and workspace memory.
3. Then go through [First Run](/en/tutorials/first-run) and [Model and Scene Setup](/en/tutorials/model-setup).
4. Use [Architecture](/en/reference/architecture) and [Permissions and Storage](/en/reference/permissions-and-storage) as deeper reference pages when you need them.
