import axios from 'axios'
import { baseURL } from '../config/Api'
const Axios = axios.create({
    baseURL:baseURL,
    withCredentials:true,
})
export default Axios