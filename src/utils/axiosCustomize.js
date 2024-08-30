import axios from 'axios'
import nProgress from 'nprogress'
import { store } from '../redux/store'

nProgress.configure({ showSpinner: false, trickleSpeed: 100 })

const instance = axios.create({ baseURL: 'http://localhost:8081/' })

instance.interceptors.request.use(function (config) {

  const access_token = store.getState()?.user?.account?.access_token
  config.headers['Authorization'] = 'Bearer ' + access_token

  nProgress.start()
  return config
}, (error) => Promise.reject(error))

instance.interceptors.response.use((res) => {
  nProgress.done()
  return res && res.data ? res.data : res
}, (err) => {
  nProgress.done()
  return err && err.response && err.response.data
    ? err.response.data
    : Promise.reject(err)
})

export default instance
