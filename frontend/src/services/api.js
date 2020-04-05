import axios from 'axios'

const api = axios.create({
  // parte da URL que vai ser mantida durante todas as chamadas
  baseURL: 'http://localhost:3333'
})

export default api
