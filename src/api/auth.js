import request from '@/utils/request'
import { handlerResponse } from '@/utils/auth'

class AuthService {
  // 登录
  static async login({ userName, password }) {
    try {
      const requestOptions = {
        url: '/login',
        method: 'post',
        data: {
          username: userName,
          password
        }
      }
      const response = await request(requestOptions)
      return handlerResponse(response)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default AuthService
