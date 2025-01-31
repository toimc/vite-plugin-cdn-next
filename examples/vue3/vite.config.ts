import { URL, fileURLToPath } from 'node:url'
import { PluginOption, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { cdn } from 'vite-plugin-cdn-next'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    cdn({
      modules: [
        'vue',
        'vue-demi',
        'pinia',
        'axios',
        {
          name: 'element-plus',
          aliases: ['lib', 'es'],
          spare: [
            { url: 'https://unpkg.com/element-plus@2.4.2/dist/index.css' },
            { url: 'https://unpkg.com/element-plus@2.4.2/theme-chalk/dark/css-vars.css' },
          ],
        },
        {
          name: 'echarts',
          aliases: ['core', 'renderers', 'components', 'features', 'charts'],
          spare: [
            {
              url: 'https://unpkg.com/echarts@5.4.3/dist/echarts.min.js',
              defer: true,
            },
          ],
        },
        { name: 'vue-i18n', relativeModule: './dist/vue-i18n.global.prod.js' },
        {
          name: 'sortablejs',
          global: 'Sortable',
          relativeModule: './Sortable.min.js',
          spare: [
            {
              async: true,
              url: 'https://unpkg.com/sortablejs@1.15.0/Sortable.min.js',
            },
          ],
        },
      ],
    }) as PluginOption,
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
