import { defineConfig } from 'vite'
import { splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
process.env.BROWSER = 'Google Chrome'
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host:true,
    open:true
  },
  plugins: [vue(),splitVendorChunkPlugin()]
})
