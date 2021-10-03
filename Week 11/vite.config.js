import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VitePluginElementPlus from 'vite-plugin-element-plus'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    VitePluginElementPlus({
      // if you need to use the *.scss source file, you need to uncomment this comment
      // useSource: true
      format: mode === 'development' ? 'esm' : 'cjs',
    }),
  ]
}))
