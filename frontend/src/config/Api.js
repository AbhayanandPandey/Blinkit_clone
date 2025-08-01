export const baseURL = 'http://localhost:5001'
// export const baseURL = 'https://blinkit-clone-7swg.onrender.com'

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
    refreshToken: {
        url: '/api/user/refresh-token',
        method: 'post'
    },
    userDetails: {
        url: '/api/user/user-details',
        method: 'get'
    },
    logout: {
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
    addCategory: {
        url: '/api/category/create-category',
        method: 'post'
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
    deleteCategoty: {
        url: '/api/category/delete-category',
        method: 'delete'
    },
    addSubCategory: {
        url: '/api/sub-category/create',
        method: 'post'
    },
    getSubCategories: {
        url: '/api/sub-category/get-sub-categories',
        method: 'post'
    },
    editSubCategory: {
        url: '/api/sub-category/update',
        method: 'put'
    },
    deleteSubCategory: {
        url: '/api/sub-category/delete',
        method: 'delete'
    },
    uploadProducts: {
        url: '/api/product/create-product',
        method: 'post'
    },
    getProducts: {
        url: '/api/product/get-product',
        method: 'post'
    },
    deleteProduct: {
        url: '/api/product/delete-product',
        method: 'delete'
    },
    updateProduct: {
        url: '/api/product/update-product',
        method: 'put'
    },
    getProductsByCategory: {
        url: '/api/product/get-productbycategory',
        method: 'post'
    },
    getProductsByCategoryAndSubCategory: {
        url: '/api/product/get-productbycategoryandsubcategory',
        method: 'post'
    }, 
}

export default Api