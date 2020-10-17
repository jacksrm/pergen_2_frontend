import axios from 'axios';

const api = axios.create({ 
  baseURL: 'https://pergen-2-backend.herokuapp.com/'
});

export default api;