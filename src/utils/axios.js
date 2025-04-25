import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://api.xabdaz.tech', // no trailing slash
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
