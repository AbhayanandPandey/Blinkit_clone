import axios from 'axios'
import Api, { baseURL } from '../config/Api'
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
            originalReq.retry=true
            const refreshToken = localStorage.getItem('refreshToken')
            if(refreshToken){
                const newAccessToken = await refreshAccessToken(refreshToken)

                if(newAccessToken){
                    originalReq.headers.Authorization = `Bearer ${newAccessToken}`
                    return Axios(originalReq)
                }
            }
        }
        return Promise.reject(error)
    }

)

const refreshAccessToken = async(refreshToken)=>{
    try {
        const response = await Axios({
            ...Api.refreshToken,
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        })
        const accessToken = response.data.data.accessToken
        localStorage.setItem('accessToken', accessToken)
        return accessToken
    } catch (error) {
        console.error('Error refreshing access token:', error)
        throw error
    }
}

export default Axios