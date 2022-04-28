/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

/**
 * @description: Token interface parameters
 */
export interface TokenParams {
  grant_type: string;
  username: string;
  password: string;
  newPassword: string;
  input: any;
}

/**
 * @description: Get user information
 */
export interface GetUserInfoByUserIdParams {
  userId: string | number;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

export class FunctionalityInfo {
  functionalityName: string;
}


/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/*Employee*/
export class EmployeeModel {
  $id: string;
  $type: string;
  // _id: string;
  // _type: string;
  EmployeeId: string;
  EmployeeNumber: string;
  Name: string;
  Password: string;
  IsEnabled: boolean;
  GlobalState: number;
  CreatedOn: string;
  CreatedBy: string;
  ModifiedOn: string;
  ModifiedBy: string;
  HistoryId: number;
  Remark: string;
}

/*ResponseModel*/
export class ResponseModel {
  $id: string;
  $type: string;
  IsSuccess: boolean;
  Employee: EmployeeModel;
  OAuthAccessToken: string;
  SecurityToken: string;
  SessionId: string;
  HasError: boolean;
  TotalRows: number;
}

/**
 * @description: Token interface return value
 */
export interface TokenResultModel {
  token_type: string;
  access_token: string;
  expires_in: number;
  response: any;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoByUserIdModel {
  role: RoleInfo;
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 介绍
  desc?: string;
  
  // 权限
  functionalities?: FunctionalityInfo[];
  
}

/**
 * @description: Get user functionalities
 */
export interface GetFunctionalitiesByEmployeeNumberParams {
  employeeNumber: string;
}

/**
 * @description: Get functionalities return value
 */
export interface GetFunctionalitiesByEmployeeNumberResponse {
  HasError: boolean;
  ErrorMsg: string;
  // 权限
  FunctionalityNames?: string[]; 
}

/*License*/
export class License {
  $id: string;
  LicenseId: string;
  ApplicationVersion: string;
  LicenseKey: string;
  EnvironmentType: number;
  CreatedOn: string;
  CreatedBy: string;
  ModifiedOn: string;
  ModifiedBy: string;
}

/**
 * @description: Create License
 */
export interface CreateLicenseParams {
  Licenses: License[];
}

/**
 * @description: Create License return value
 */
export interface CreateLicenseResponse {
  HasError: boolean;
  ErrorMsg: string;
}
