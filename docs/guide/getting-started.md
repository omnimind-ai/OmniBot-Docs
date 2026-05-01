# 快速开始

OmnibotApp 是一个面向安卓设备的 AI Agent 应用，采用 `Kotlin + Flutter` 混合架构。它不是单纯聊天应用，而是围绕“理解、决策、执行、反馈”构建的可操作型 Agent。

::: tip
本页内容以当前代码仓库为准，优先参考真实的 `build.gradle.kts`、`settings.gradle.kts`、`pubspec.yaml` 和源码目录，而不是历史说明。
:::

## 环境要求

- JDK `11+`
- Flutter SDK `3.9.2+`
- Android SDK `compileSdk 36`
- Node.js `18+`，仅用于运行这个独立的 VitePress 文档站

## 获取源码

```bash
git clone https://github.com/omnimind-ai/OpenOmniBot.git
cd OpenOmniBot
```

## 初始化必须的子模块

项目当前直接依赖 `third_party/omniinfer`，至少需要先初始化下面这些内容：

```bash
git submodule update --init third_party/omniinfer
git -C third_party/omniinfer submodule update --init framework/mnn
git -C third_party/omniinfer submodule update --init framework/llama.cpp
```

如果未来你要重点使用 Qualcomm NPU 方案，再继续关注 `ExecuTorch QNN` 对应能力即可。

## 初始化 Flutter 模块

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

## 构建 Android 调试包

回到仓库根目录后执行：

```bash
./gradlew assembleDevelopDebug
```

如果需要直接安装到设备：

```bash
./gradlew installDevelopDebug
```

## 常用验证命令

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

## 当前工程里你需要知道的真实构建事实

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

## 文档站运行方式

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

下一步建议直接看 [配置指南](/guide/configuration)。
