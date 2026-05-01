# 模型与场景配置

这一页重点解决两个问题：模型怎么接，场景怎么分。

## 1. 先建 Provider Profile

VLM 模型设置页当前支持：

- `OpenAI-compatible`
- `Anthropic`

一个 Profile 最少要有：

- `name`
- `baseUrl`
- `apiKey`

然后再补充模型列表：

- 能拉远端模型就直接同步
- 拉不到就手动写模型 ID

## 2. 场景拆分建议

### 最小可用方案

如果你只想先跑通：

- `dispatch.model` 和 `vlm.operation.primary` 先都指向一个稳定的大模型
- 其他场景暂时共用同一模型

### 更合理的方案

- `dispatch.model`: 负责理解任务和路由，选择强推理模型
- `vlm.operation.primary`: 负责 UI 操作，选择多模态模型
- `compactor.context`: 选择快而便宜的总结模型
- `memory.embedding`: 使用真正 embedding 模型
- `memory.rollup`: 选择成本较低的总结模型

## 3. 语音场景怎么理解

`scene.voice` 在代码里是单独配置项，说明项目把“回复文本的语音合成与播放”也视作场景能力，而不是固定功能。

这意味着：

- 文字理解模型和语音输出模型可以拆开
- 未来做多语音、多角色或 TTS 策略切换时，结构已经留好了

## 4. Memory Embed 一定要单独看

这是最容易误配的一项。

`Memory Embed` 不是普通聊天模型，它要满足：

- 输出向量
- 用于工作区记忆检索
- 和 rollup / long memory 形成配合

如果这里配置成普通聊天模型，经常会表现为：

- 记忆检索没效果
- embedding 配置显示不完整

## 5. 本地模型怎么启用

本地模型页已经划分为两块：

- `Service`
- `Market`

### Service

重点是：

- 本地服务端口
- 已安装模型
- 模型状态轮询

### Market

重点是：

- 浏览模型市场
- 按类别筛选
- 下载和刷新

## 6. 后端选择建议

### `omniinfer-mnn`

- 更适合把移动端模型运行能力直接纳入产品流程
- 当前代码和资产里能看到完整市场数据支持

### `llama.cpp`

- 适合偏通用的大语言模型本地运行
- 对开发者来说生态熟悉，调试也直观

### `executorch-qnn`

- 更偏 Qualcomm NPU 加速场景
- 设备兼容性要先确认
- 构建配置也要同步关注

## 7. 一套实用的入门配置

如果你是第一次接这个项目，可以先按下面思路：

1. 远端接一个稳定的大模型给 `dispatch.model`
2. 再接一个视觉模型给 `vlm.operation.primary`
3. `memory.embedding` 用 embedding 模型
4. `memory.rollup` 用便宜一点的总结模型
5. 本地模型先不开，等主流程稳定后再启用

这样最容易把问题限定在“权限 / 路由 / 任务编排”，而不是把本地推理问题也混在一起。
