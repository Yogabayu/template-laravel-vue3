import axios from 'axios';

const mainURL = axios.create({
  // baseURL: 'http://localhost:8000/api/v1',
  baseURL: 'https://templatevue.yogabayuap.com/api/v1',
  timeout: 5000, 
});

export default mainURL;
