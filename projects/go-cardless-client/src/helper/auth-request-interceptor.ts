import type { InternalAxiosRequestConfig } from 'axios';
import {AccessTokenManager} from "./auth-token-manager";

/**
 * Creates an Axios request interceptor for attaching the Authorization header.
 */
export function createAuthRequestInterceptor(tokenManager: AccessTokenManager) {
    return {
        async onRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
            const token = await tokenManager.getAccessToken();

            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;

            return config;
        },

        onRequestError(error: Error): Promise<any> {
            console.error('Request interceptor error:', error);
            return Promise.reject(error);
        },
    };
}
