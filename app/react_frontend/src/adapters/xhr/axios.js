import axios from 'axios';
import Cookies from 'js-cookie'


export const getBaseAxios = () => {
  const csrftoken = Cookies.get().csrftoken
  return axios.create({
    withCredentials: true,
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
      'X-CSRFToken': csrftoken
    }
  })
}

export const getAuthHeaderAxios = () => {
  const csrftoken = Cookies.get().csrftoken
  return axios.create({
    withCredentials: true,
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
      "X-CSRFToken": csrftoken,
      "Authorization": `Token ${window.localStorage.getItem("token")}`
    }
  })
}
