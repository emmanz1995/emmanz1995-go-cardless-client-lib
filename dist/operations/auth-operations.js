"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthOperationsImpl = void 0;
class AuthOperationsImpl {
    constructor(axiosInstance) {
        this.axios = axiosInstance;
    }
    async getToken(secretId, secretKey) {
        try {
            return await this.axios.post(`/api/v2/token/new/`, {
                secret_id: secretId,
                secret_key: secretKey,
            });
        }
        catch (err) {
            console.error('Error retrieving tokens:', err);
            throw new Error(err.message);
        }
    }
    async refreshTokens(refreshToken) {
        try {
            return await this.axios.post(`/api/v2/token/refresh`, { refresh: refreshToken }, {
                headers: {
                    Accept: 'application/json',
                },
            });
        }
        catch (err) {
            console.error('Failed to refresh access token:', err);
            throw new Error(err.message);
        }
    }
}
exports.AuthOperationsImpl = AuthOperationsImpl;
