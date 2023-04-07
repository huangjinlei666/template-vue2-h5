import request from '@/utils/request'

//登录
export function login(data){
    return request({
        url:'/login',
        method:'post',
        data
    })
}

//登出
export function logout(){
    return request({
        url:'/logout',
        method:'get',
    })
}