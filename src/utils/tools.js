import _ from 'lodash'
import dayjs from 'dayjs'

// 处理数字精度
export const strip = (num, precision = 12) => +parseFloat(num.toPrecision(precision))

// 获取 URL 的 query
export const getQueryParam = (name, url) => {
  if (!url) url = window.location.href
  name = name.replace(/[\\[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

// 过滤 Undefined
export const filterUndefined = options => _.omitBy(options, _.isUndefined)

export const formatDate = (date, format = 'YYYY-MM-DD HH:mm') => dayjs(date).format(format)

export const checkEmailFormat = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line no-useless-escape
  return re.test(email)
}

export const checkPhoneNumberFormat = (phone) => {
  const re = /^[0-9]{1,15}$/
  return re.test(phone)
}

export const checkIdNumberFormat = (idNumber) => {
  const re = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
  return re.test(idNumber)
}

export const checkPassportFormat = (passport) => {
  const re = /^[A-Za-z0-9]{1,10}$/
  return re.test(passport)
}

export const checkDrivingLicenseFormat = (license) => {
  const re = /^[A-Za-z0-9]{1,20}$/
  return re.test(license)
}

export const checkDocumentNumber = (type, docNumber) => {
  const variations = {
    ID: checkIdNumberFormat,
    PASSPORT: checkPassportFormat,
    DRIVING_LICENSE: checkDrivingLicenseFormat
  }
  return variations[type] && variations[type].call(this, docNumber)
}

export const getDesensitizedUsername = (username) => {
  if (!username || !_.isString(username)) return ''
  if (checkEmailFormat(username)) {
    if (username.indexOf('@') <= 1) {
      return username
    }
    return `${username.substr(0, 3)}****${username.substr(
      username.indexOf('@'),
    )}`
  }
  if (checkPhoneNumberFormat(username)) {
    if (String(username).length <= 6) {
      return username
    }
    return username.replace(/(\d{3})\d*(\d{3})/, '$1****$2')
  }
  return username
}

export const numberWithThousands = (num = 0) => {
  const parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

// 时间显示格式：yyyy-mm-dd hh:mm
export const formatDateOne = (paramsDate) => {
  const time = new Date(paramsDate) // 毫秒转换为正常时间
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  let hours = time.getHours()
  let minute = time.getMinutes()
  if (year < 10) {
    year = `0${year}`
  }
  if (month < 10) {
    month = `0${month}`
  }
  if (day < 10) {
    day = `0${day}`
  }
  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minute < 10) {
    minute = `0${minute}`
  }
  return `${year}-${month}-${day} ${hours}:${minute}`
}

export const toLine = str => str.replace(/([A-Z])/g, '_$1').toLowerCase()

export const toHump = str => str.replace(/_([\w+])/g, (all, letter) => letter.toUpperCase())

// 时间格式转换2019-10-18T09:12:33.297+0000====》yyyy-mm-dd hh:mm
export const formatDateTwo = (date) => {
  const arr = date.split('T')
  const d = arr[0]
  const darr = d.split('-')

  const t = arr[1]
  const tarr = t.split('.000')
  const marr = tarr[0].split(':')

  const dd = `${parseInt(darr[0], 10)}-${parseInt(darr[1], 10)}-${parseInt(darr[2], 10)} ${parseInt(marr[0], 10)}:${parseInt(marr[1], 10)}`
  return dd
}
