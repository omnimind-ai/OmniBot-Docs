---
layout: home

hero:
  name: Omnibot
  text: Your On-Device AI Assistant
  tagline: Covering features, tutorials, development guidance, and architecture notes
  image:
    src: /assets/app-logo.png
    alt: App logo
  actions:
    - theme: brand
      text: Development Guide
      link: /en/guide/development
    - theme: alt
      text: Tutorials
      link: /en/tutorials/first-run

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
    details: Built-in Alpine workspace, skills repository, terminal runtime, and file preview make it easy to extend the AI agent into an executable workspace.
  - title: MCP and WebChat interfaces
    details: The app can enable a LAN MCP server and WebChat mirror, while also supporting remote MCP tool services.
---

![Omnibot example interface](/assets/example.png)

## Suggested reading order

1. Start with [Features](/en/features/overview) to understand the core on-device agent capabilities.
2. Then go through [First Run](/en/tutorials/first-run) and [Model and Scene Setup](/en/tutorials/model-setup).
3. Use the [Development Guide](/en/guide/development) when you need dependencies, build commands, models, permissions, MCP, and workspace memory setup.
4. Use [Architecture](/en/reference/architecture) and [Permissions and Storage](/en/reference/permissions-and-storage) as deeper reference pages when you need them.
