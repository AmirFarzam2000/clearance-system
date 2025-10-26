 export interface SessionUserModel {
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
    UserFiscalPeriods: Array<{
      userID: number;
      FiscalPeriodID: number;
      fiscalPeriodName: string;
    }>;
    isMultiFiscalPeriod: boolean;
  }