import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import GitHubStars from './components/GitHubStars.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(GitHubStars),
      'nav-screen-content-after': () => h(GitHubStars)
    })
} satisfies Theme
