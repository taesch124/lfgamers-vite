import axios, { HttpStatusCode } from 'axios';
import NavigationService from '@services/navigationService';

const appClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

appClient.interceptors.response.use(
  (response) => {
    if (response.status === HttpStatusCode.Unauthorized) {
      console.log('Unauthorized, redirecting to login');
      (NavigationService.getNavigate())('/login');
    }
    return response;
  },
  (error) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      (NavigationService.getNavigate())('/login');
    }
    return Promise.reject(error);
  },
);

export default appClient;