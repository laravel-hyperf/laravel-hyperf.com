import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance"
import { redirectPlugin } from '@vuepress/plugin-redirect'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { sidebarConfig } from './sidebar.js'
import { removeHtmlExtensionPlugin } from 'vuepress-plugin-remove-html-extension'
import { seoPlugin } from '@vuepress/plugin-seo'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Laravel Hyperf',
  description: 'A Laravel-Style PHP Framework for Web Artisans.',

  ignoreDeadLinks: true,
  bundler: viteBundler(),

  plugins: [
    seoPlugin({
      hostname: 'https://laravel-hyperf.com',
      fallBackImage: '/home.png',
      ogp: (ogp, page) => ({
        ...ogp,
        'og:title': 'Laravel Hyperf - A Laravel-Style PHP Framework For Web Artisans',
        'og:description': "Laravel Hyperf is a Laravel-style framework with native coroutine support for ultra-high performance.",
      }),
    }),
    removeHtmlExtensionPlugin(),
    mdEnhancePlugin({
      hint: true,
      tasklist: true,
      include: true,
      tabs: true,
      align: true,
      chart: true,
    }),
    redirectPlugin({
        config: {
          '/docs': '/docs/introduction.html',
        },
    }),
    docsearchPlugin({
      appId: 'A2UA6ZNU27',
      apiKey: '03f51299803c8172f7b3008d88a12c86',
      indexName: 'laravel-hyperf'
    }),
  ],

  theme: defaultTheme({
    logo: 'icon.svg',

    docsRepo: 'laravel-hyperf/laravel-hyperf.com',

    docsBranch: 'main/docs',

    navbar: [
      '/',
      {
        text: 'Documentation',
        link: '/docs/introduction',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/laravel-hyperf/laravel-hyperf',
      }
    ],

    sidebar: sidebarConfig,

    sidebarDepth: 0,
  }),
})
