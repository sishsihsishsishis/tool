import { UserConfigExport, ConfigEnv } from 'vite'
import { resolve } from 'path'
import { splitVendorChunkPlugin } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
process.env.BROWSER = 'Google Chrome'
import dotenv from 'dotenv'
dotenv.config()
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  let prodMock = true
  console.log(command,mode)
  return {
    server: {
      host: true,
      open: true,
      proxy: {
        [process.env.VITE_API_URL as string]: {
          target: 'http://47.102.118.168:8080',
          rewrite: (path) => path.replace(process.env.VITE_API_URL as string, '')
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
