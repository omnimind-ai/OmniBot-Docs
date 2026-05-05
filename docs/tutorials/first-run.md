# 首次启动

## 第 1 步：安装并打开应用

Github Release:
https://github.com/omnimind-ai/OpenOmniBot/releases

CNB(国内网络优先)：
https://cnb.cool/o.a/OpenOmniBot/-/releases

我们提供两种形式的安装包，后续软件内自动更新会自动保持该选择。如果你想要更换的话，直接手动覆盖一次安装即可。
![apk](/assets/apk.png)

如果你是开发环境：
```bash
./gradlew :app:installDevelopStandardDebug -Ptarget=lib/main_standard.dart #安装标准slim版本
./gradlew :app:installDevelopOmniinferDebug -Ptarget=lib/main_omniinfer.dart #安装带有本地模型推理版本
```

首次启动后，会出现如下的欢迎页面并且后台开始初始化 alpine 系统：
<img src="/assets/welcome.png" alt="welcome" style="width:30%;" />


## 第 2 步：补齐核心权限

打开授权页，把下面四项优先开齐：

- 后台运行权限
- 悬浮窗权限
- 应用列表读取
- 无障碍辅助权限

可选再补：

- 通知
- `Shizuku`
- 存储 / 文件相关权限
- 日历与精确闹钟

::: warning
如果无障碍和悬浮窗没开，很多“会说但不会做”的症状都会出现。
:::

## 第 3 步：配置模型提供商

进入设置相关入口后，先到模型提供商页面创建一个 Profile：

- 如果你接的是兼容 OpenAI 的服务，选 `OpenAI-compatible`
- 如果你用的是 Claude 体系，选 `Anthropic`

需要填写：

- 名称
- Base URL
- API Key
- 可用模型 ID

<div class="image-grid">
  <img src="/assets/config-1.png" alt="设置 AI 能力">
  <img src="/assets/config-2.png" alt="配置提供商">
</div>

## 第 4 步：绑定场景模型

接着进入场景模型设置，把关键场景分配给合适的模型：

- `Agent`
- `Operation`
- `Compactor`
- `Memory Embed`
- `Memory Rollup`

如果你只有一个强模型，也能先全部绑定它；只是成本和性能通常不够理想。

![配置场景模型](/assets/config-3.png)

## 第 5 步：检查工作区环境

应用启动后会自动准备工作区与默认文档。你还可以在设置中检查 Alpine / 运行环境是否初始化完成。

![环境初始化](/assets/alpine.jpg)

## 第 6 步：验证一次最小执行链路

建议在聊天页做一次简单验证：

1. 输入一个不依赖复杂外部服务的任务。
2. 观察是否出现工具活动或执行卡片。
3. 观察是否能正确调用权限、工作区或浏览器能力。

### 推荐验证任务

- “帮我总结当前页面可以做什么”
- “打开工作区看看有哪些文件”
- “列出已经安装的技能”

## 第 7 步：再启用增强能力

基础链路跑通后，再逐个开启：

- 本地模型
- 技能商店
- 定时任务
- MCP 服务
- 远端 MCP 工具

这样排查问题会轻松很多。

下一步建议看 [模型与场景配置](/tutorials/model-setup)。
