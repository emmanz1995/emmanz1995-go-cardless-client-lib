import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { AccessTokenManager } from './auth-token-manager';
import {GoCardlessClientError} from "../error/GoCardlessClientError";

/**
 * Creates response interceptors to handle 401 errors and retry the request with a new token.
 */
export function createAuthResponseInterceptor(
    axiosInstance: AxiosInstance,
    tokenManager: AccessTokenManager
) {
    return {
        onResponse(response: AxiosResponse): AxiosResponse {
            return response;
        },

        async onResponseError(error: GoCardlessClientError): Promise<any> {
            const originalRequest = error.axiosError.config as InternalAxiosRequestConfig & { _retry?: boolean };
            console.log("🔁 Interceptor caught 401");

            if (
                error.axiosError.response?.status === 401 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;

                try {
                    // ❗ Invalidate and fetch new access token
                    tokenManager.invalidateToken();
                    const newToken = await tokenManager.getAccessToken();

                    // 🔁 Retry original request with new token
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;

                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error('Token refresh failed after 401:', refreshError);
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    };
}
