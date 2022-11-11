import axios from 'axios'
import { ElMessage } from 'element-plus'

export function axiosSetup() {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL
    axios.defaults.timeout = 15000000

    // request interceptor
    axios.interceptors.request.use(
        config => {
            return config
        },
        error => {
            console.log(error) // for debug
            ElMessage({
                message: error.message,
                type: 'error',
                duration: 1000
            })
            return Promise.reject(error)
        }
    )

    // response interceptor
    axios.interceptors.response.use(
        response => {
            return response
        },
        error => {
            console.log(error) // for debug
            ElMessage({
                message: error.message,
                type: 'error',
                duration: 1000
            })
            return Promise.reject(error)
        }
    )
}