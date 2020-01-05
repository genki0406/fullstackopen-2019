import axios from 'axios'

const baseUrl = 'http://localhost:3002/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async object => {
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id, object) => {
  const response = await axios.patch(`${baseUrl}/${id}`, object)
  return response.data
}

export default {
  getAll,
  createNew,
  update
}