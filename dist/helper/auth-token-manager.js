"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenManager = void 0;
class AccessTokenManager {
    constructor(authOps, secretId, secretKey) {
        this.accessToken = null;
        this.accessExpiresAt = null;
        this.ongoingTokenRequest = null;
        this.authOps = authOps;
        this.secretId = secretId;
        this.secretKey = secretKey;
    }
    async getAccessToken() {
        console.log('making access token');
        const now = Date.now();
        const buffer = 5 * 1000; // optional: expire a few seconds early
        if (this.accessToken && this.accessExpiresAt && now < this.accessExpiresAt - buffer) {
            return this.accessToken;
        }
        if (this.ongoingTokenRequest) {
            return this.ongoingTokenRequest;
        }
        // this.ongoingTokenRequest = this.retrieveNewToken().finally(() => {
        //   this.ongoingTokenRequest = null;
        // });
        return await this.retrieveNewToken();
    }
    async retrieveNewToken() {
        try {
            const tokenData = await this.authOps.getToken(this.secretId, this.secretKey);
            this.accessToken = tokenData.access;
            this.accessExpiresAt = Date.now() + tokenData.access_expires * 1000;
            return this.accessToken;
        }
        catch (error) {
            this.accessToken = null;
            this.accessExpiresAt = null;
            throw error;
        }
    }
    invalidateToken() {
        this.accessToken = null;
        this.accessExpiresAt = null;
    }
}
exports.AccessTokenManager = AccessTokenManager;
