# 构建与发布

这一页把常用命令、构建差异和发布注意事项集中起来。

## Android / Gradle

### 常用命令

```bash
./gradlew build
./gradlew assembleDevelopDebug
./gradlew assembleProductionRelease
./gradlew installDevelopDebug
./gradlew test
./gradlew connectedAndroidTest
./gradlew lint
```

## Flutter

```bash
cd ui
flutter pub get
flutter test
flutter analyze
flutter build aar
```

如果你只想验证 web chat 相关资源，也可以单独关注 `app/build.gradle.kts` 里的 Flutter Web 构建任务。

## 文档站

```bash
npm install
npm run docs:dev
npm run docs:build
npm run docs:preview
```

最终静态文件输出在：

```text
docs/.vitepress/dist
```

## Flavor 差异

当前 `app` 模块有两个 flavor：

- `develop`
- `production`

二者都注入：

```kotlin
buildConfigField("String", "BASE_URL", "\"${prop("OMNIBOT_BASE_URL")}\"")
```

### Debug

- `applicationIdSuffix = ".debug"`
- 不混淆
- 使用 debug 签名

### Release

- 启用资源压缩与混淆
- 使用 release keystore
- 启用 V2 / V3 签名

## 构建前必须确认的几件事

1. `third_party/omniinfer` 子模块已初始化。
2. `ui` 模块已成功执行 `flutter pub get`。
3. Release 构建时签名属性已配置。
4. 如果用到本地模型 / QNN，确认目标设备和相关依赖满足要求。

## 一个容易忽略的构建行为

`app` 模块的 `preBuild` 依赖了：

- `buildFlutterWebBundle`
- `syncFlutterWebBundle`

也就是说，安卓构建时会自动：

1. 在 `ui/` 内执行 `flutter build web`
2. 以 `lib/web_main.dart` 为入口生成 bundle
3. 把产物拷贝进 APK assets

这条链路失败时，很多人会误以为是 Android 构建问题，实际上往往是 Flutter Web 侧先出了错。

## 发布检查清单

- `./gradlew test`
- `./gradlew lint`
- `cd ui && flutter test`
- `./gradlew assembleProductionRelease`
- 安装到真机验证权限、MCP、工作区和基础执行链路
