export const baseURL = 'http://localhost:5001'

const Api = {
    register: {
        url: '/api/user/register',
        method: 'post'
    },
    login: {
        url: '/api/user/login',
        method: 'post'
    },
    forgot_password: {
        url: '/api/user/forgot-password',
        method: 'put'
    },
    verify_otp: {
        url: '/api/user/forgot-password-otp',
        method: 'put'
    },
    reset_password: {
        url: "/api/user/reset-password",
        method: "put"
    },
    refreshToken:{
        url: '/api/user/refresh-token',
        method: 'post'
    },
    userDetails: {
        url: '/api/user/user-details',
        method: 'get'
    },
    logout:{
        url: '/api/user/logout',
        method: 'get'
    },
    uploadAvatar: {
        url: '/api/user/upload-avatar',
        method: 'put'
    },
    updateUser: {
        url: '/api/user/update-user',
        method: 'put'
    },
    addCategory:{
        url:'/api/category/create-category',
        method:'post'
    },
    uploadImage: {
        url: '/api/file/upload',
        method: 'post'
    },
    getCategories: {
        url: '/api/category/get-categories',
        method: 'get'
    },
    updateCategory: {
        url: '/api/category/update-category',
        method: 'put'
    },
}

export default Api