---
layout: home

hero:
  name: Omnibot
  text: Kotlin + Flutter 的安卓 AI Agent 文档站
  tagline: 基于当前仓库代码整理，覆盖配置、功能介绍、使用教程与开发参考。
  image:
    src: /assets/omnibot.png
    alt: Omnibot
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看配置
      link: /guide/configuration

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
    details: 内置 workspace、技能仓、终端运行时与文件预览，方便把 AI Agent 扩展成可执行工作台。
  - title: MCP 与 WebChat 能力
    details: 应用内可启用局域网 MCP 服务和 WebChat 镜像，同时支持配置远端 MCP 工具服务。
---

## 这份文档解决什么问题

- 帮你快速搭起本地开发环境并成功构建 APK。
- 帮你理解项目的 Kotlin / Flutter / AI 能力是如何拼在一起的。
- 帮你从权限、模型、场景、技能、工作区一路走到可用状态。
- 帮你在做二次开发时快速定位核心模块、配置项和数据落盘位置。

<div class="metric-grid">
  <div>
    <strong>Android 宿主</strong><br>
    App、服务、MCP、前台能力
  </div>
  <div>
    <strong>Flutter UI</strong><br>
    Chat、Settings、Models、Workspace
  </div>
  <div>
    <strong>Assists 状态机</strong><br>
    任务生命周期与执行编排
  </div>
  <div>
    <strong>本地能力</strong><br>
    Memory、Skills、Local Models、Terminal
  </div>
</div>

![Omnibot 示例界面](/assets/example.png)

## 推荐阅读顺序

1. 先看 [快速开始](/guide/getting-started)，确认依赖和构建命令。
2. 再看 [配置指南](/guide/configuration)，把模型、权限、MCP、工作区记忆配好。
3. 接着看 [首次启动教程](/tutorials/first-run) 和 [模型与场景配置](/tutorials/model-setup)。
4. 最后按需查看 [架构参考](/reference/architecture) 和 [权限与存储](/reference/permissions-and-storage)。
