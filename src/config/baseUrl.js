/* 本地环境 */
// const prod = 'http://192.168.50.60:8081';
// const dev = 'http://192.168.50.60:8081';

// 线上
// const prod = 'http://47.90.17.90:8081'
// const dev = 'http://47.90.17.90:8081'

// 测试
const prod = 'http://dev.xjetry.top:8082';
const dev = 'http://dev.xjetry.top:8082';

const env = process.env.NODE_ENV || 'development'

const config = {
  development: dev,
  production: prod
}

export default config[env]
