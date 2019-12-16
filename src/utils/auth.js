const TOKEN_KEY = 'access_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export const setToken = token => localStorage.setItem(TOKEN_KEY, token)

export const handlerResponse = (response) => {
  const data = response && response.data
  if (response.status !== 200) {
    const error = (data && data.error) || response.statusText
    return Promise.reject(error)
  }
  return Promise.resolve(data)
}

export const handlerSuccessResponse = (response) => {
  if (!response || !response.success) {
    return Promise.reject(response.data)
  }
  return Promise.resolve(response.data)
}

export const handlerSuccessResponseV2 = (response) => {
  if (!response || !(response.code === 0)) {
    return Promise.reject(response.msg)
  }
  return Promise.resolve(response.data)
}

export const handlerSuccessResponseV3 = (response) => {
  if (!response || !(response.code === 0)) {
    return Promise.reject(response)
  }
  return Promise.resolve(response.data)
}

export const handlerSuccessResponseV4 = (response) => {
  if (!response || !(response.code === 0)) {
    return Promise.reject(response.msg)
  }
  return Promise.resolve(response)
}
