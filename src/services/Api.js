import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3030/',
  withCredentials: true
})

http.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  if (error.response?.status === 401) {
    localStorage.clear()
    window.location.assign('/')
  }

  return Promise.reject(error)
})

//CREATE
export const createData = (body) => {
    return http.post('details', body)
}

//READ
export const getAllData = () => {
    return http.get('/details')
}
//UPDATE
export const updateData = (id, {...tempState}) => {
    return http.patch(`/details/${id}`, {...tempState})
}

//DELETE
export const deleteData = (id) => {
    return http.delete(`/details/${id}`)
}