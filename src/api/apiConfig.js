/**
 * Error code found in app
 */
const errorCodes = {
  TIMEOUT: '111',
  INVALIDTOKEN: 403,
  NOTFOUNDCODE: 404,
  SERVERERRORCODE: 501,
  TOKENEXPIRECODE: 401,
  LOWER_APP_VERSION_CODE: '',
};

/**
 * all url used in app
 */
const apiUrl = {
  SERVER_API_URL:
    'http://ec2-16-170-165-104.eu-north-1.compute.amazonaws.com:5000/api/user/',
    USER_PROFILE:
    'http://ec2-16-170-165-104.eu-north-1.compute.amazonaws.com:5000/api/user',
};

/**
 * web pages urls in app
 */
const webPageUrls = {
  refresh_token: '',
};

const apiConfigs = {
  ...errorCodes,
  ...apiUrl,
  ...webPageUrls,
};

export default apiConfigs;
