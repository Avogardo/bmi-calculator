import axios from 'axios';

const userApi = () => axios.create({
  baseURL: `http://localhost:8081`,
  withCredentials: true,
});

const foodApi = () => axios.create({
  baseURL: `http://localhost:8081`,
});

const api = {
  userApi,
  foodApi,
};

export default api;
