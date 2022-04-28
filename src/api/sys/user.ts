import { defHttp } from '~/utils/http/axios';
import { ContentTypeEnum } from '~/enums/httpEnum';
import {
  TokenParams,
  TokenResultModel,
  GetFunctionalitiesByEmployeeNumberParams,
  GetFunctionalitiesByEmployeeNumberResponse,
  CreateLicenseParams,
  CreateLicenseResponse
} from './model/userModel';
import { ErrorMessageMode } from '~/utils/http/axios/types';
import qs from 'qs';
import { userStore } from '~/store/modules/user';

enum Api {
  GetToken = '/api/token',
}

/**
 * @description: user token api
 */
export function getTokenApi(params: TokenParams, mode: ErrorMessageMode = 'modal') {
  
  params.grant_type = "password";
  params.input = "{'$type':'EBS.FabMES.BusinessOrchestration.EmployeeManagement.RequestObjects.CheckEmployeeLoginRequest,EBS.FabMES.BusinessOrchestration','User':'" + params.username + "','Password':'" + params.password + "'}";

  //defHttp.setHeader({'Content-type': ContentTypeEnum.FORM_URLENCODED});
  
  return defHttp.request<TokenResultModel>(
    {
      url: Api.GetToken,
      method: 'POST',
      data: qs.stringify(params),
      headers: {
        'Content-type': ContentTypeEnum.FORM_URLENCODED,
        'EBS_SessionId': 1,
        'EBS_UserName': params.username,
        'EBS_HostName': 'EBS',
        'EBS_ClientTenantName': 'EBS',
        'EBS_TimeZone': '',
        'EBS_Culture': 'en-US',
        'EBS_ReturnFaultExceptions': 'false',
      },
    },
    {
      errorMessageMode: mode,
    }
  );
}

