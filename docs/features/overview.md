# 功能总览

这一页站在产品和研发之间的视角，梳理当前工程已经成型的核心能力。

## 1. AI Chat 与 Agent 执行

Flutter 聊天页不只是消息列表，还承载了 Agent 执行可视化：

- 对话线程与归档
- 工具活动条
- 深度思考卡片
- 执行摘要卡片
- 浏览器叠层
- 工件预览

这意味着用户看到的不只是“结果文本”，而是完整执行轨迹。

## 2. 手机自动化与 VLM 任务

Agent 的执行能力依赖几个底层模块共同完成：

- `accessibility` 读取界面树
- `MediaProjectionForegroundService` 负责屏幕采集
- `assists` 维护任务生命周期
- 场景模型中的 `scene.vlm.operation.primary` 负责核心视觉决策

这套链路让应用能在安卓设备上做真实操作，而不是停在纯问答层。

![VLM 任务示例](/assets/vlm.jpg)

## 3. 权限与常驻能力

要让陪伴式 Agent 持续工作，应用围绕权限做了成体系设计：

- 后台运行权限
- 悬浮窗权限
- 应用列表读取
- 无障碍服务
- 可选的 `Shizuku`
- 精确闹钟与前台服务

这些不是边缘功能，而是任务稳定性的基础。

## 4. 技能体系

技能商店页支持：

- 搜索技能
- 安装内置技能
- 启用 / 禁用技能
- 删除技能

这使项目具备“基础 Agent + 可装配能力”的结构，而不是固定功能集。

<div class="image-grid">
  <img src="/assets/skills-store.jpg" alt="技能商店">
  <img src="/assets/skills-example.jpg" alt="技能示例">
</div>

## 5. 工作区、文件与终端

项目内已经把工作区能力做成一等公民：

- 文件浏览
- Artifact 预览
- Workspace 路径映射
- 嵌入式终端运行时
- 浏览器文件选择与共享链路

这部分让 Agent 从“会操作手机”进化到“会处理文件与项目”。

![Workspace](/assets/workspace.jpg)

## 6. 本地模型与混合推理

项目既支持远端模型，也支持端侧模型：

- 远端：OpenAI 兼容协议、Anthropic
- 本地：`llama.cpp`、`omniinfer-mnn`、`executorch-qnn`

本地模型页面还自带 “service / market” 双视图，说明工程已经把模型服务、模型市场、模型导入流程纳入产品能力。

![本地模型](/assets/local-inference.jpg)

## 7. 记忆系统

当前记忆系统至少包含三层：

- `SOUL.md`: 角色与行为边界
- `CHAT.md`: 对话默认提示
- `MEMORY.md`: 长期稳定记忆

再叠加：

- 短期记忆文件
- embedding 配置
- nightly rollup

整个体系已经从“聊天上下文”升级到“工作区级记忆”。

## 8. 定时任务与提醒

项目区分了两类时间能力：

- `Scheduled task`: 真正可执行的任务
- `Alarm`: 提醒类能力

结合子 Agent 流程，这意味着任务可以脱离当前会话，在未来某个时间继续完成。

<div class="image-grid">
  <img src="/assets/timed.jpg" alt="定时任务">
  <img src="/assets/timing.jpg" alt="时间设置">
</div>

## 9. MCP 与 WebChat

`McpServerManager.kt` 已经说明这不是一个只给本地 UI 用的应用，它还提供：

- 局域网 MCP 服务
- Bearer Token 鉴权
- WebChat 页面
- Workspace 文件访问
- Browser Mirror
- Conversation API

如果你要把 Omnibot 变成“手机上的 AI 执行节点”，这部分就是对外接口层。

![Browser](/assets/browser.jpg)
