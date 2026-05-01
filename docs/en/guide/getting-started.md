# Getting Started

OmnibotApp is an Android AI agent project built with a `Kotlin + Flutter` hybrid architecture. It is designed for the full execution loop of understanding, deciding, acting, and reflecting instead of functioning as a chat-only app.

::: tip
This page follows the current repository code. When older notes conflict with real files such as `build.gradle.kts`, `settings.gradle.kts`, or `pubspec.yaml`, trust the code first.
:::

## Requirements

- JDK `11+`
- Flutter SDK `3.9.2+`
- Android SDK with `compileSdk 36`
- Node.js `18+` only for running this standalone VitePress documentation site

## Clone the source

```bash
git clone https://github.com/omnimind-ai/OpenOmniBot.git
cd OpenOmniBot
```

## Initialize the required submodules

The project currently depends directly on `third_party/omniinfer`, so at minimum initialize these pieces:

```bash
git submodule update --init third_party/omniinfer
git -C third_party/omniinfer submodule update --init framework/mnn
git -C third_party/omniinfer submodule update --init framework/llama.cpp
```

If you plan to focus on Qualcomm NPU flows later, you can then look deeper into the ExecuTorch QNN path.

## Initialize the Flutter module

```bash
cd ui
flutter pub get
```

If Flutter reports:

```text
Could not read script '.../ui/.android/include_flutter.groovy'
```

run:

```bash
flutter clean
flutter pub get
```

## Build the Android debug app

Back at the repository root:

```bash
./gradlew assembleDevelopDebug
```

To install directly on a device:

```bash
./gradlew installDevelopDebug
```

## Common verification commands

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

## Important build facts from the current codebase

- Android `applicationId`: `cn.com.omnimind.bot`
- `minSdk`: `29`
- `targetSdk`: `34`
- `compileSdk`: `36`
- Current app version in `app/build.gradle.kts`:
  - `versionCode = 1`
  - `versionName = "0.3.9"`
- Product flavors:
  - `develop`
  - `production`

## Running this docs site

Inside the docs repository:

```bash
npm install
npm run docs:dev
```

To build the static site:

```bash
npm run docs:build
npm run docs:preview
```

The next useful page is [Configuration](/en/guide/configuration).
