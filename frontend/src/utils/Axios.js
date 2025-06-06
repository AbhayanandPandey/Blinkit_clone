import axios from 'axios'
import { baseURL } from '../config/Api'
const Axios = axios.create({
    baseURL:baseURL,
    withCredentials:true,
})

Axios.interceptors.request.use(
    async(config)=>{
        const accessToken = localStorage.getItem('accessToken')
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (err)=>{
        return Promise.reject(err)
    }
)

Axios.interceptors.request.use(
    (res)=>{
        return res;
    },
    async (error)=>{
        let originalReq = error.config
        if(error.res.status ===401 && !originalReq.retry){
            
        }
    }

)


export default Axios