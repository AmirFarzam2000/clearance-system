import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import type { SessionUserModel } from '../types/sessionUserModel';



const noNeedToAuthHeaderRoutes = ["/login"];

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.mazouclearance.ir',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let cachedSessionUser: SessionUserModel | undefined = undefined;

const getCachedToken = (): SessionUserModel | undefined => {
  if (cachedSessionUser) return cachedSessionUser;

  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      cachedSessionUser = JSON.parse(userStr);
      return cachedSessionUser;
    }
  } catch (error) {
    console.error('Error getting cached token:', error);
  }

  return undefined;
};

const validateToken = (token: string): boolean => {
  if (!token) return false;
  
  try {
    const user = getCachedToken();
    if (user?.expireDate) {
      const expireDate = new Date(user.expireDate);
      return expireDate > new Date();
    }
    return true;
  } catch (error) {
    return false;
  }
};

const clearBusinessFormData = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('domain');
  cachedSessionUser = undefined;
};

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const domain = localStorage.getItem('domain') || 'mj.mazouclearance.ir';
    config.headers = config.headers || {};
    config.headers['Domain'] = domain;

    if (!noNeedToAuthHeaderRoutes.includes(config.url || '')) {
      const userSession = getCachedToken();
      if (userSession?.token && validateToken(userSession.token)) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${userSession.token}`;
        
        if (userSession.UserFiscalPeriods && userSession.UserFiscalPeriods.length > 0) {
          const fiscalPeriodId = userSession.UserFiscalPeriods[0].FiscalPeriodID;
          config.headers['FiscalPeriodID'] = fiscalPeriodId.toString();
          console.log('Added FiscalPeriodID header:', fiscalPeriodId);
        } else {
          console.log('No fiscal periods found for user');
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (error.config.url === "/login") {
        return Promise.reject(error);
      }
      
      clearBusinessFormData();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    const responseData = error.response?.data as any;
    if (responseData?.message) {
      return Promise.reject(new Error(responseData.message));
    }

    return Promise.reject(error);
  }
);

export default api;
export { getCachedToken, validateToken, clearBusinessFormData };
export type { SessionUserModel };
