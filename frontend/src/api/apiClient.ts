import axios, { HttpStatusCode } from 'axios';
import NavigationService from '@services/navigationService';
import appStore from '@atoms/store';
import sessionAtom from '@atoms/sessionAtom';

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
      console.warn('Unauthorized, redirecting to login');
      appStore.set(sessionAtom, { authenticated: false });
      (NavigationService.getNavigate())('/login');
    }
    return response;
  },
  (error) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      console.warn('Unauthorized, redirecting to login');
      appStore.set(sessionAtom, { authenticated: false });
      (NavigationService.getNavigate())('/login');
    }
    return Promise.reject(error);
  },
);

export default appClient;