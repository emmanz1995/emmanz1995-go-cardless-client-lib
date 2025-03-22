import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AccessTokenManager } from "./auth-token-manager";

export function setupAuthInterceptors(
    axiosInstance: AxiosInstance,
    tokenManager: AccessTokenManager
): void {
    axiosInstance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
          console.log('getting token');
          const token = await tokenManager.getAccessToken();

            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

            // If 401 and not already retried
            if (
                error.response?.status === 401 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;

                try {
                    // ❗ Invalidate current token (maybe expired or revoked)
                    tokenManager.invalidateToken();

                    // 🔄 Get new token
                    const newToken = await tokenManager.getAccessToken();

                    // 🔁 Retry original request with new token
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;

                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error('Token fetch failed after 401:', refreshError);
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
}
