import axios from 'axios'
import router from '../router'
import { getToken, removeToken } from '@/utils/auth'
import baseUrl from '@/config/baseUrl'

// create an axios instance
const request = axios.create({
  baseURL: baseUrl // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    // do something before request is sent
    // 获取token
    const token = getToken()
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response.status === 401 || error.response.status === 403) {
      removeToken()
      router.replace({ path: '/login' })
    }
    return Promise.reject(error)
  }
)

export default request
