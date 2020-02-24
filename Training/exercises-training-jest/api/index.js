import axios from 'axios'

export const PAGE_SIZE = 50
export const API_URL = 'http://localhost:3000'
export const getPage = async (page = 1) => {
  const response = await axios.get(`${API_URL}/employees?_page=${page}`)
  return response.data
}

export const getCount = async () => {
  const response = await axios.get(`${API_URL}/employees/count`)
  return response.data
}
