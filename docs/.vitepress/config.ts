import { defineConfig } from 'vitepress'

function normalizeBase(rawBase: string): string {
  let base = rawBase.trim()

  if (base.length === 0) {
    return '/'
  }

  if (!base.startsWith('/')) {
    base = `/${base}`
  }

  if (!base.endsWith('/')) {
    base = `${base}/`
  }

  return base
}

function resolveBase(): string {
  const explicitBase = process.env.VITEPRESS_BASE?.trim()
  if (explicitBase) {
    return normalizeBase(explicitBase)
  }

  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]?.trim()
  if (process.env.GITHUB_ACTIONS === 'true' && repositoryName) {
    if (repositoryName.endsWith('.github.io')) {
      return '/'
    }

    return `/${repositoryName}/`
  }

  return '/'
}

const base = resolveBase()

const zhNav = [
  { text: '快速开始', link: '/guide/getting-started' },
  { text: '配置指南', link: '/guide/configuration' },
  { text: '功能介绍', link: '/features/overview' },
  { text: '使用教程', link: '/tutorials/first-run' },
  { text: '参考资料', link: '/reference/architecture' }
]

const enNav = [
  { text: 'Getting Started', link: '/en/guide/getting-started' },
  { text: 'Configuration', link: '/en/guide/configuration' },
  { text: 'Features', link: '/en/features/overview' },
  { text: 'Tutorials', link: '/en/tutorials/first-run' },
  { text: 'Reference', link: '/en/reference/architecture' }
]

const zhSidebar = {
  '/guide/': [
    {
      text: '入门',
      items: [
        { text: '快速开始', link: '/guide/getting-started' },
        { text: '配置指南', link: '/guide/configuration' },
        { text: '项目结构', link: '/guide/project-structure' }
      ]
    }
  ],
  '/features/': [
    {
      text: '功能',
      items: [{ text: '功能总览', link: '/features/overview' }]
    }
  ],
  '/tutorials/': [
    {
      text: '教程',
      items: [
        { text: '首次启动', link: '/tutorials/first-run' },
        { text: '模型与场景配置', link: '/tutorials/model-setup' },
        { text: '技能、工作区与自动化', link: '/tutorials/automation-workspace' }
      ]
    }
  ],
  '/reference/': [
    {
      text: '参考',
      items: [
        { text: '架构参考', link: '/reference/architecture' },
        { text: '构建与发布', link: '/reference/build-and-release' },
        { text: '权限与存储', link: '/reference/permissions-and-storage' }
      ]
    }
  ]
}

const enSidebar = {
  '/en/guide/': [
    {
      text: 'Guide',
      items: [
        { text: 'Getting Started', link: '/en/guide/getting-started' },
        { text: 'Configuration', link: '/en/guide/configuration' },
        { text: 'Project Structure', link: '/en/guide/project-structure' }
      ]
    }
  ],
  '/en/features/': [
    {
      text: 'Features',
      items: [{ text: 'Overview', link: '/en/features/overview' }]
    }
  ],
  '/en/tutorials/': [
    {
      text: 'Tutorials',
      items: [
        { text: 'First Run', link: '/en/tutorials/first-run' },
        { text: 'Model and Scene Setup', link: '/en/tutorials/model-setup' },
        { text: 'Skills, Workspace, and Automation', link: '/en/tutorials/automation-workspace' }
      ]
    }
  ],
  '/en/reference/': [
    {
      text: 'Reference',
      items: [
        { text: 'Architecture', link: '/en/reference/architecture' },
        { text: 'Build and Release', link: '/en/reference/build-and-release' },
        { text: 'Permissions and Storage', link: '/en/reference/permissions-and-storage' }
      ]
    }
  ]
}

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: 'OmnibotApp Docs',
  description: 'Kotlin + Flutter 安卓 AI Agent 项目文档站',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: `${base}assets/app-logo.png` }],
    ['meta', { name: 'theme-color', content: '#0f766e' }]
  ],
  themeConfig: {
    logo: '/assets/omnibot.png',
    siteTitle: false,
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/omnimind-ai/OpenOmniBot' }
    ]
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'OmnibotApp Docs',
      description: 'Kotlin + Flutter 安卓 AI Agent 项目文档站',
      themeConfig: {
        nav: zhNav,
        sidebar: zhSidebar,
        outline: {
          level: [2, 3],
          label: '本页导航'
        },
        docFooter: {
          prev: '上一篇',
          next: '下一篇'
        },
        lastUpdatedText: '最近更新',
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
        langMenuLabel: '切换语言',
        footer: {
          message: 'Built with VitePress. 文档内容以当前仓库代码为准。',
          copyright: 'Copyright © OmnibotApp Docs'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'OmnibotApp Docs',
      description: 'Documentation site for the Kotlin + Flutter Android AI agent project.',
      themeConfig: {
        nav: enNav,
        sidebar: enSidebar,
        outline: {
          level: [2, 3],
          label: 'On this page'
        },
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        lastUpdatedText: 'Last updated',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Return to top',
        langMenuLabel: 'Change language',
        footer: {
          message: 'Built with VitePress. Content is aligned with the current repository codebase.',
          copyright: 'Copyright © OmnibotApp Docs'
        }
      }
    }
  }
})
