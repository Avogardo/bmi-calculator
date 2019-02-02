import axios from 'axios';
import socketIOClient from 'socket.io-client';

const userApi = () => axios.create({
  baseURL: `http://localhost:8081`,
  withCredentials: true,
});

const foodApi = () => axios.create({
  baseURL: `http://localhost:8081`,
});

const ioEndpoint = 'http://localhost:8082';
const socket = socketIOClient(ioEndpoint);

const api = {
  userApi,
  foodApi,
  socket,
};

export default api;
