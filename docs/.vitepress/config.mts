import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Feedback Solution",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        items: [
          { text: 'Yleiskatsaus', link: '/yleiskatsaus' },
          { text: 'Ohjeet', link: '/ohjeet' },
          { text: 'Projektin Rakenne', link: '/rakenne' },
          { text: 'Projektin Eteneminen', link: '/eteneminen' },
          {
            text: "Muut",
            collapsed: true,

            items: [
              { text: "NPM Paketit", link: '/npm-paketit' }
            ]
          },
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/juhamikael/ICT-Project-Feedback-Solution' }
    ]
  }
})
