# OmnibotApp Docs

这是一个独立于主工程的 VitePress 文档站仓库，用来为 `OmnibotApp / OpenOmniBot` 提供配置说明、功能介绍和使用教程。

## 本地运行

```bash
npm install
npm run docs:dev
```

## 构建静态站点

```bash
npm run docs:build
npm run docs:preview
```

## 部署到 GitHub Pages

仓库已经包含工作流文件：

- `.github/workflows/deploy-pages.yml`

默认行为：

- 推送到 `main` 分支时自动构建并部署
- 使用 GitHub 官方 Pages Actions
- 自动根据仓库名推导 VitePress `base`

### 仓库设置

在 GitHub 仓库中打开：

`Settings -> Pages -> Build and deployment -> Source`

选择：

- `GitHub Actions`

### 可选：自定义 base 路径

如果你使用自定义域名，或者不希望采用默认的 `/<repo>/` 路径规则，可以在仓库变量里设置：

- 变量名：`PAGES_BASE_PATH`
- 示例值：
  - `/`
  - `/docs/`

工作流会把这个变量注入 `VITEPRESS_BASE`，覆盖自动推导逻辑。

## 内容结构

- `docs/guide/`: 快速开始、配置、项目结构
- `docs/features/`: 功能总览
- `docs/tutorials/`: 首次使用、模型配置、自动化与工作区教程
- `docs/reference/`: 架构、构建发布、权限与存储参考
