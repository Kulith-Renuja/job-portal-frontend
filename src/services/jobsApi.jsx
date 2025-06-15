import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`)
    return response.data.data
  } catch (error) {
    console.error('Error fetching jobs:', error)
    throw error
  }
}

export const postJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/jobs`, jobData)
    return response.data.data
  } catch (error) {
    console.error('Error posting job:', error)
    throw error
  }
}