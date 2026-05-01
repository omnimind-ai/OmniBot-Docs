import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'OmnibotApp Docs',
  description: 'Kotlin + Flutter 安卓 AI Agent 项目文档站',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/assets/omnibot.png' }],
    ['meta', { name: 'theme-color', content: '#0f766e' }]
  ],
  themeConfig: {
    logo: '/assets/omnibot.png',
    siteTitle: 'OmnibotApp Docs',
    search: {
      provider: 'local'
    },
    nav: [
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '配置指南', link: '/guide/configuration' },
      { text: '功能介绍', link: '/features/overview' },
      { text: '使用教程', link: '/tutorials/first-run' },
      { text: '参考资料', link: '/reference/architecture' }
    ],
    sidebar: {
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
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/omnimind-ai/OpenOmniBot' }
    ],
    outline: {
      level: [2, 3],
      label: '本页导航'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    footer: {
      message: 'Built with VitePress. 文档内容以当前仓库代码为准。',
      copyright: 'Copyright © OmnibotApp Docs'
    }
  }
})
