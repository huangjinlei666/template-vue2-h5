import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
const service=axios.create({
    baseURL:'',
    withCredentials:false,
    timeout:10*1000
})

service.interceptors.request.use(
    config=>{
        if(!config.hideloading){
            Toast.loading({
                forbidClick:true
            })
        }
        if(store.getters.token){
            config.headers['X-Token']=''
        }
        return config
    },
    err=>{
        console.log('请求拦截错误:',err)
        return Promise.reject(err)
    }
)

service.interceptors.response.use(
    response=>{
        Toast.clear()
        const res=response.data
        if(res.status&&res.status !==200){
            if(res.status===401){
                store.dispatch('logout').then(()=>{
                    location.reload()
                })
            }
            return Promise.reject(res || 'err')
        }else{
            return Promise.resolve(res)
        }
    },
    err=>{
        Toast.clear()
        console.log('响应拦截错误:',err)
        return Promise.reject(err)
    }
)

export default service