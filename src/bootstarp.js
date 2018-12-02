import axios from 'axios'

export default (() => {
    axios.defaults.baseURL  = 'https://jsonplaceholder.typicode.com'

    axios.interceptors.request.use(config => config)

    axios.interceptors.response.use(response => response)
})()