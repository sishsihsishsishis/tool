import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import Router from '@/router'
import { axiosSetup } from "@/utils/axios";
import * as echarts from 'echarts'

axiosSetup()
echarts.registerMap('empty', `{ "type": "Point" }`);

createApp(App)
    .use(ElementPlus)
    .use(Router)
    .mount('#app')


