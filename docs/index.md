---
layout: home

hero:
  name: 小万
  text: 你的端侧 AI 助手
  tagline: 功能介绍、使用教程、开发指南与参考资料。
  image:
    src: /assets/app-logo.png
    alt: App logo
  actions:
    - theme: brand
      text: 开发指南
      link: /guide/development
    - theme: alt
      text: 使用教程
      link: /tutorials/first-run

features:
  - title: 原生 Android + Flutter 混合架构
    details: Android 宿主负责服务、权限、MCP、终端与系统能力，Flutter 负责聊天、设置、模型与工作区 UI。
  - title: 面向执行的 Agent 闭环
    details: 从任务理解、场景分流、VLM 操作、上下文压缩，到执行结果回流与记忆整理，形成完整执行链路。
  - title: 系统级手机自动化
    details: 依赖无障碍、MediaProjection、悬浮窗与前台服务，支持在安卓设备上进行真实任务操作。
  - title: 本地模型与远端模型并存
    details: 场景模型支持 OpenAI 兼容协议和 Anthropic；本地模型支持 llama.cpp、MNN 和 QNN。
  - title: 工作区、技能与终端
    details: 内置 alpine workspace、技能仓库、终端运行时与文件预览，方便把 AI Agent 扩展成可执行工作台。
  - title: MCP 与 WebChat 能力
    details: 应用内可启用局域网 MCP 服务和 WebChat 镜像，同时支持配置远端 MCP 工具服务。
---


![Omnibot 示例界面](/assets/example.png)

## 推荐阅读顺序

1. 先看 [功能总览](/features/overview)，了解端侧 Agent 的核心能力。
2. 接着看 [首次启动教程](/tutorials/first-run) 和 [模型与场景配置](/tutorials/model-setup)。
3. 做开发时再看 [开发指南](/guide/development)，确认依赖、构建命令、模型、权限、MCP 和工作区记忆配置。
4. 最后按需查看 [架构参考](/reference/architecture) 和 [权限与存储](/reference/permissions-and-storage)。
