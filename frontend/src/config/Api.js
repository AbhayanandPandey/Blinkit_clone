export const baseURL = 'http://localhost:5001'

const Api = {
    register:{
        url:'/api/user/register',
        method:'post'
    },
    login:{
        url:'/api/user/login',
        method:'post'
    }
}

export default Api