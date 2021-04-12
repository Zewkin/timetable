import axios from 'axios'

const getTimetable = () => {
  return axios.get('../mock/schedule.json')
}

export default {
  getTimetable
}