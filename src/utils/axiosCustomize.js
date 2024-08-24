import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:8081/' })

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  return config
}, (error) => Promise.reject(error))

instance.interceptors.response.use((res) => {
  return res && res.data ? res.data : res
}, (err) => {
  console.log('🚀 ~ err:', err.response)
  return err && err.response && err.response.data
    ? err.response.data
    : Promise.reject(err)
})

export default instance
