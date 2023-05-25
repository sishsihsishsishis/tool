import { UserConfigExport, ConfigEnv } from 'vite'
import { resolve } from 'path'
import { splitVendorChunkPlugin } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  if(mode === 'development'){
    //.env.development
    process.env.BROWSER = 'Google Chrome'
    process.env.VITE_API_URL='/apiv1'
    process.env.BACKEND_API_URL='http://47.102.118.168:8080'
  }
  return {
    server: {
      host: true,
      proxy: {
        [process.env.VITE_API_URL as string]: {
          target: process.env.BACKEND_API_URL,
          rewrite: (path) => path.replace(process.env.VITE_API_URL as string, ''),
          secure: false,
          changeOrigin: true,
        }
      },
    },
    plugins: [vue(), splitVendorChunkPlugin(),
    viteMockServe({
      // default
      mockPath: 'mock',
      supportTs:true,
      watchFiles:true,
    })],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  }
}
