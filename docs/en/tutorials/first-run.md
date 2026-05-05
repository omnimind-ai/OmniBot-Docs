# First Run


## Step 1: Install and open the app

GitHub Release:
https://github.com/omnimind-ai/OpenOmniBot/releases

CNB, recommended for users in mainland China:
https://cnb.cool/o.a/OpenOmniBot/-/releases

We provide two package variants. The in-app auto-updater will keep using the variant you selected. If you want to switch variants later, install the other package manually once to overwrite the current one.

![apk](/assets/apk.png)

For development builds:

```bash
./gradlew :app:installDevelopStandardDebug -Ptarget=lib/main_standard.dart # install the standard slim version
./gradlew :app:installDevelopOmniinferDebug -Ptarget=lib/main_omniinfer.dart # install the version with local model inference
```

After the first launch, the welcome page appears while the app initializes the Alpine system in the background:

<img src="/assets/welcome.png" alt="welcome" style="width:30%;" />

## Step 2: Complete the core permissions

Open the authorization page and prioritize these four permissions:

- background execution
- overlay permission
- installed apps access
- accessibility service

Then optionally add:

- notifications
- `Shizuku`
- storage and file-related permissions
- calendar and exact alarms

::: warning
If overlay and accessibility are missing, many failures look like “the agent understands the task but never actually acts.”
:::

## Step 3: Configure model providers

From settings, go to the provider configuration page and create a profile:

- choose `OpenAI-compatible` for OpenAI-style APIs
- choose `Anthropic` for Claude-style APIs

You will typically need:

- a profile name
- base URL
- API key
- available model IDs

<div class="image-grid">
  <img src="/assets/config-1.png" alt="AI capability settings">
  <img src="/assets/config-2.png" alt="Provider configuration">
</div>

## Step 4: Bind scene models

Then open the scene model settings and bind appropriate models to the major scenes:

- `Agent`
- `Operation`
- `Compactor`
- `Memory Embed`
- `Memory Rollup`

If you only have one strong model at first, you can temporarily bind everything to it and refine later.

![Scene model configuration](/assets/config-3.png)

## Step 5: Check the workspace environment

On startup the app prepares the workspace and default files automatically. You can also verify that the Alpine or runtime environment is initialized from settings.

![Environment initialization](/assets/alpine.jpg)

## Step 6: Test a minimal execution path

Use the chat page to validate one simple flow:

1. send a task that does not depend on a complex external service
2. watch for tool activity or execution cards
3. confirm that permissions, workspace access, or browser features are being called correctly

### Good first test prompts

- “Summarize what actions are available on the current screen.”
- “Open the workspace and tell me what files are there.”
- “List the installed skills.”

## Step 7: Enable advanced capabilities gradually

Once the base flow works, turn on more features one by one:

- local models
- skill store
- scheduled tasks
- MCP server
- remote MCP tools

That makes debugging much easier than enabling everything at once.

Next, read [Model and Scene Setup](/en/tutorials/model-setup).
