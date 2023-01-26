import axios from 'axios'

export const baseURL = 'http://127.0.0.1:8000/szczepienia/';

const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
      Authorization: sessionStorage.getItem('access')
          ? 'Bearer ' + sessionStorage.getItem('access')
          : null,
          'Content-Type': 'application/json',
          accept: 'application/json',
    }
  });
  
export default instance;