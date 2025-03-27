import { AxiosInstance } from 'axios';
import { AccessTokenManager } from "./auth-token-manager";
import {createAuthRequestInterceptor} from "./auth-request-interceptor";
import {createAuthResponseInterceptor} from "./auth-response-interceptor";

export function setupAuthInterceptors(
    axiosClient: AxiosInstance,
    tokenManager: AccessTokenManager
): void {
    const { onRequest, onRequestError } = createAuthRequestInterceptor(tokenManager);
    axiosClient.interceptors.request.use(onRequest, onRequestError);

    const { onResponse, onResponseError } = createAuthResponseInterceptor(axiosClient, tokenManager);
    axiosClient.interceptors.response.use(onResponse, onResponseError);
}
