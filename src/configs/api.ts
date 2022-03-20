import { APIHost } from '../utils/constants';

enum APIService {
  auth,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/auth`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.public)}/api/authentication/login`,
  userProfile: `${getBaseUrl(APIService.public)}/apiAdmin/users/list`,
  getUser: `${getBaseUrl(APIService.public)}/apiAdmin/users/list`,
  getProducts: `${getBaseUrl(APIService.public)}api/categories/list`,

};
