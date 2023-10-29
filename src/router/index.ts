import { createRouter, createWebHistory } from 'vue-router'
import { h,resolveComponent  } from 'vue';
const N = {setup:()=>()=>h(resolveComponent('router-view'))}

// const auth = async (to: any, from: any) => {
//   let token = window.localStorage.getItem('token')
//   if (token) {
//     try {
//       await axios.get('/user/powers');
//     } catch {
//       router.push({path:'/login',query:{redirect:encodeURIComponent(to.fullPath)}})
//       return false
//     }
//   }
//   else router.push({path:'/login',query:{redirect:encodeURIComponent(to.fullPath)}})
// }

const router = createRouter({
  history: createWebHistory(),//import.meta.env.VITE_API_URL), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/view/login.vue'),
    },
    {
      path: '/home',
      component: () => import('@/view/home.vue'),
      meta: { title: 'Home' },
      
    },
    {
      path: '/panel',
      component: () => import('@/view/panel.vue'),
      meta: { title: 'Panel' },
    },
    {
      path: '/home/:teamid/:meetingid',
      component: () => import('@/Studio.vue'),
      meta: { title: 'Studio' },
      props:true
    },
  ]
})

export default router