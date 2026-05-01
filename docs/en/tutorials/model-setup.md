# Model and Scene Setup

This page focuses on two things: how to connect models and how to split scenes sensibly.

## 1. Create a provider profile first

The VLM provider page currently supports:

- `OpenAI-compatible`
- `Anthropic`

A minimal profile usually needs:

- `name`
- `baseUrl`
- `apiKey`

Then you can add model IDs:

- fetch them remotely if the backend supports listing
- maintain them manually if it does not

## 2. Recommended scene split

### Minimal viable setup

If your priority is to get the app running quickly:

- point both `dispatch.model` and `vlm.operation.primary` at one stable strong model
- let the remaining scenes temporarily share that same model

### A more balanced setup

- `dispatch.model`: task understanding and routing, so use a strong reasoning model
- `vlm.operation.primary`: UI execution, so prefer a multimodal model
- `compactor.context`: a fast and cheaper summarization model
- `memory.embedding`: a real embedding model
- `memory.rollup`: a lower-cost summarization model for nightly consolidation

## 3. How to think about the voice scene

`scene.voice` appears as an independent scene in code, which means the app treats voice synthesis and playback as its own capability rather than a fixed side effect.

That leaves room for:

- separate text understanding and voice output models
- future multi-voice or multi-style TTS strategies

## 4. Memory Embed needs special attention

This is one of the easiest scene bindings to misconfigure.

`Memory Embed` is not a normal chat model. It needs to:

- output vectors
- support workspace memory retrieval
- cooperate with rollup and long-term memory logic

If you bind a normal chat model here, the app may look configured while retrieval quality stays poor.

## 5. Enabling local models

The local model page is already split into:

- `Service`
- `Market`

### Service

This part focuses on:

- local service port
- installed models
- model status polling

### Market

This part focuses on:

- browsing the model catalog
- filtering by category
- downloading and refreshing models

## 6. Backend selection guidance

### `omniinfer-mnn`

- Well-suited for making mobile inference part of the product flow.
- The repository already includes clear market and asset support for it.

### `llama.cpp`

- Good for more general local language model serving.
- Familiar tooling and debugging flow for many developers.

### `executorch-qnn`

- More focused on Qualcomm NPU acceleration paths.
- Device compatibility matters more here.
- Build-time and runtime constraints need closer attention.

## 7. A practical starter setup

For a first rollout, this is a safe path:

1. bind a stable remote model to `dispatch.model`
2. bind a vision-capable model to `vlm.operation.primary`
3. use a true embedding model for `memory.embedding`
4. use a cheaper summarization model for `memory.rollup`
5. leave local models disabled until the main execution path is stable

That keeps early debugging focused on permissions, routing, and orchestration instead of mixing in local inference issues too early.
