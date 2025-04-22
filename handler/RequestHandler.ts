// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// export interface RequestOptions {
//   method: RequestMethod;
//   endpoint: string;
//   accessToken?: string | '';
//   refreshToken?: string | null;
//   validateAndRetrieveNewToken?: (accessToken: string, refreshToken?: string | null) => Promise<any>;
//   requestBody?: any;
//   pathParameters?: Record<string, string>;
//   queryParameters?: Record<string, string>;
//   customHeaders?: Record<string, string>;
//   cookies?: Record<string, string> | null;
// }

// export type AuthCognitoResponse = {
//   "AccessToken": string;
//   "CognitoGroups": Array<string>;
//   "ExpiresIn": number;
//   "RefreshToken": string;
// };

// export class RequestHandler {
//   private axiosInstance: AxiosInstance;
//   private readonly baseURL: string;
//   private axiosResponse: Promise<AxiosResponse<any>> | any;

//   constructor() {
//     this.axiosInstance = axios.create({
//       baseURL: process.env.SEVEN_TECHNOLOGIES_CLOUD_MAIN_SERVICE_URL || '',
//     });

//     this.baseURL = process.env.SEVEN_TECHNOLOGIES_CLOUD_MAIN_SERVICE_URL || '';

//     this.axiosResponse = axios;

//     this.axiosInstance.interceptors.request.use(
//       (config) => {
//         config.headers.Authorization = `Bearer ${config.headers.Authorization}`;
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );
//   }

//   async makeAuthenticatedRequest({
//     method,
//     endpoint,
//     accessToken,
//     refreshToken,
//     validateAndRetrieveNewToken,
//     requestBody = null,
//     pathParameters = {},
//     queryParameters = {},
//     customHeaders = {},
//     cookies = null,
//   }: RequestOptions): Promise<any> {

//     if (!endpoint) {
//       console.log("nao existe and point ")
//       throw new Error('Endpoint is required');
//     }

//     if (!accessToken) {
//       console.log("nao existe token")
//       throw new Error('Token is required');
//     }

//     try {
//       const validatedToken = await validateAndRetrieveNewToken(accessToken, refreshToken);
//       accessToken = validatedToken;
//     } catch (e) {
//       console.log("token invalido", accessToken)
//       console.log(e);
//     }

//     let url = endpoint.replace(/{(\w+)}/g, (match, key) => {
//       if (pathParameters.hasOwnProperty(key)) {
//         const value = pathParameters[key];
//         delete pathParameters[key];
//         return value;
//       }
//       return match;
//     });

//     if (cookies !== null) {
//       this.axiosInstance.defaults.withCredentials = true;
//     }
//     url = `${this.baseURL}${url}`;

//     const requestConfig: AxiosRequestConfig = {
//       method,
//       url,
//       params: queryParameters,
//       headers: {
//         ...customHeaders,
//         'Authorization': `Bearer ${accessToken}`,
//         'Accept': 'application/json',
//       },
//       data: requestBody,
//     };

//     try {
//       const resp: AxiosResponse = await this.axiosResponse(requestConfig);

//       if (resp.status !== 200) {
//         throw new Error(`Request failed with status code ${resp.status}`);
//       }
//       return resp.data;
//     } catch (e) {
//       console.log(e, "error ")
//       if (e.status === 404){
//         return []
//       }
//       throw new Error('Error in the request');
//     }
//   }

//   async AuthRequest(authType: 'Bearer' | 'Basic', secret: {
//     username: string;
//     password: string
//   } | null, refreshToken: string | null | undefined): Promise<AuthCognitoResponse | { error: string }> {
//     let token: string = '';
//     try {
//       if (secret) {
//         token = Buffer
//           .from(`${secret.username}:${secret.password}`)
//           .toString('base64');
//       }

//       if (refreshToken) {
//         token = refreshToken;
//       }
//       const baseURl = process.env.SEVEN_TECHNOLOGIES_CLOUD_MAIN_SERVICE_URL
//       const responseConfig = {
//         method: 'GET',
//         url: `${baseURl}/cognito/user/login`,
//         headers: {
//           'Authorization': `${authType} ${token}`,
//           'Accept': 'application/json',
//         }
//       };
//       const response = await axios(responseConfig);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return { error: `Request error: ${error.message}` };
//       } else {
//         return { error: 'Unknown request error' };
//       }
//     }
//   }

//   async makeCustomerAuthenticatedRequest(
//       {
//         method,
//         endpoint,
//         accessToken,
//         refreshToken,
//         validateAndRetrieveNewToken,
//         requestBody = null,
//         pathParameters = {},
//         queryParameters = {},
//         customHeaders = {},
//         cookies = null,
//       }: RequestOptions): Promise<any> {

//     if (!endpoint) {
//       throw new Error('Endpoint is required');
//     }

//     if (!accessToken) {
//       throw new Error('Token is required');
//     }

//     try {
//       const validatedToken = await validateAndRetrieveNewToken(accessToken, refreshToken);
//       accessToken = validatedToken;
//     } catch (e) {
//       console.log("token invalido", accessToken)
//       console.log(e);
//     }

//     let url = endpoint.replace(/{(\w+)}/g, (match, key) => {
//       if (pathParameters.hasOwnProperty(key)) {
//         const value = pathParameters[key];
//         delete pathParameters[key];
//         return value;
//       }
//       return match;
//     });

//     if (cookies !== null) {
//       this.axiosInstance.defaults.withCredentials = true;
//     }

//     const requestConfig: AxiosRequestConfig = {
//       method,
//       url,
//       params: queryParameters,
//       headers: {
//         ...customHeaders,
//         'Authorization': `Bearer ${accessToken}`,
//         'Accept': 'application/json',
//       },
//       data: requestBody,
//     };

//     try {
//       const resp: AxiosResponse = await this.axiosResponse(requestConfig);
//       if (resp.status !== 200) {
//         console.log(resp, ">>>>>>> error 1")
//         throw new Error(`Request failed with status code ${resp.status}`);
//       }
//       return resp.data;
//     } catch (e) {
//       console.log(e, ">>>>>>> error 2")

//       throw new Error('Error in the request');
//     }
//   }

//   async makeRequest({
//                             method,
//                             endpoint,
//                             requestBody = null,
//                             queryParameters = {},
//                             customHeaders = {},
//                           }: RequestOptions): Promise<any> {
//     if (!endpoint) {
//       throw new Error('Endpoint is required');
//     }

//     try {
//       const requestConfig: AxiosRequestConfig = {
//         method,
//         url: endpoint,
//         params: queryParameters,
//         headers: {
//           ...customHeaders,
//           'Accept': 'application/json',
//         },
//         data: requestBody,
//       };

//       const response: AxiosResponse = await axios(requestConfig);
//       if (response.status !== 200) {
//         throw new Error(`Request failed with status code ${response.status}`);
//       }
//       return response.data;
//     } catch (e) {
//       console.log('Error in simple request:', e);
//       throw new Error('Error making simple request');
//     }
//   }
// }
