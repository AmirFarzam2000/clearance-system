export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserFiscalPeriod {
  userID: number;
  fiscalPeriodID: number;
  fiscalPeriodName: string;
}

export interface LoginResponse {
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
  userFiscalPeriods: UserFiscalPeriod[];
  isMultiFiscalPeriod: boolean;
}

export interface AuthState {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
