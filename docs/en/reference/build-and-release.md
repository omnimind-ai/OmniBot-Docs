# Build and Release

This page centralizes the main commands, flavor differences, and release notes.

## Android / Gradle

### Common commands

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

If you only need to verify the WebChat-related resources, pay attention to the Flutter Web build tasks defined in `app/build.gradle.kts`.

## Docs site

```bash
npm install
npm run docs:dev
npm run docs:build
npm run docs:preview
```

The static output directory is:

```text
docs/.vitepress/dist
```

## Flavor differences

The `app` module currently defines two flavors:

- `develop`
- `production`

Both inject:

```kotlin
buildConfigField("String", "BASE_URL", "\"${prop("OMNIBOT_BASE_URL")}\"")
```

### Debug

- `applicationIdSuffix = ".debug"`
- no shrinking
- debug signing

### Release

- resource shrinking and code shrinking enabled
- release keystore required
- V2 / V3 signatures enabled

## Required checks before building

1. `third_party/omniinfer` submodules are initialized.
2. `ui` has completed `flutter pub get`.
3. Release signing properties are present for production builds.
4. If local models or QNN are involved, make sure the target device and dependencies are compatible.

## An easy-to-miss build behavior

The `preBuild` step in the `app` module depends on:

- `buildFlutterWebBundle`
- `syncFlutterWebBundle`

That means Android builds automatically:

1. run `flutter build web` inside `ui/`
2. use `lib/web_main.dart` as the entry point
3. copy the generated bundle into APK assets

When this chain fails, it is easy to misread the problem as a pure Android build issue while the root cause is actually on the Flutter Web side.

## Release checklist

- `./gradlew test`
- `./gradlew lint`
- `cd ui && flutter test`
- `./gradlew assembleProductionRelease`
- validate permissions, MCP, workspace, and the main execution path on a real device
