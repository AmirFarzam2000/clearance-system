import api, { type SessionUserModel } from './Api';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  roles: string[];
  customerRoles: string[];
  avatar: string;
  lastLoginTime: string;
  lastLoginIP: string;
  isSuperAdmin: boolean;
  isUser: boolean;
  baseRole: string;
  companyName: string;
  expireDate: string;
  remainsDay: number;
  token: string;
  userFiscalPeriods: Array<{
    userID: number;
    fiscalPeriodID: number;
    fiscalPeriodName: string;
  }>;
  isMultiFiscalPeriod: boolean;
}

export const authApi = {
  login: async (credentials: LoginRequest, retryCount = 0): Promise<any> => {
    try {
      const response = await api.post<LoginResponse>('/Users/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response;
    } catch (error: any) {
      console.error('Login error:', error);
      
      if ((error.code === 'ECONNABORTED' || error.message?.includes('timeout')) && retryCount < 2) {
        console.log(`Retrying login attempt ${retryCount + 1}/2`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return authApi.login(credentials, retryCount + 1);
      }
      
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('domain');
  },

  getCurrentUser: (): SessionUserModel | null => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    const user = authApi.getCurrentUser();
    return !!(token && user);
  },

  setDomain: (domain: string): void => {
    localStorage.setItem('domain', domain);
  },

  initialize: (): void => {
    if (!localStorage.getItem('domain')) {
      authApi.setDomain('mj.mazouclearance.ir');
    }
  },

  hasRole: (role: string): boolean => {
    const user = authApi.getCurrentUser();
    return user?.roles?.includes(role) || false;
  },

  hasAnyRole: (roles: string[]): boolean => {
    const user = authApi.getCurrentUser();
    return user?.roles?.some(role => roles.includes(role)) || false;
  },

  isSuperAdmin: (): boolean => {
    const user = authApi.getCurrentUser();
    return user?.isSuperAdmin || false;
  },

  isUser: (): boolean => {
    const user = authApi.getCurrentUser();
    return user?.isUser || false;
  }
};

export default authApi;
export type { LoginRequest, LoginResponse };
