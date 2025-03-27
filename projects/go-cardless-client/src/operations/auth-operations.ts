import {AxiosInstance} from "axios";
import {handleGoCardlessRequest} from "../helper/request-handler";
import {AccessTokenResponse, RefreshTokenResponse} from "go-cardless-core/dist/model/auth-token-response";

const GET_REFRESH_TOKEN_URL = `/api/v2/token/refresh/`
const GET_ACCESS_TOKEN_URL = `/api/v2/token/new/`

export interface AuthOperations {
    getToken(
        secretId: string,
        secretKey: string,
    ): Promise<AccessTokenResponse>;
    refreshTokens(refreshToken: string): Promise<RefreshTokenResponse>;
}

export class AuthOperationsImpl implements AuthOperations {
    private axiosClient: AxiosInstance;

    constructor(axiosClient: AxiosInstance) {
        this.axiosClient = axiosClient;
    }

    async getToken(
        secretId: string,
        secretKey: string,
    ): Promise<AccessTokenResponse> {
        console.log("Getting New Access Token")
        return handleGoCardlessRequest(() =>
            this.axiosClient.post<AccessTokenResponse>(GET_ACCESS_TOKEN_URL, {
                secret_id: secretId,
                secret_key: secretKey,
            })
        );
    }

    async refreshTokens(refreshToken: string): Promise<RefreshTokenResponse> {
        return handleGoCardlessRequest(() =>
            this.axiosClient.post<RefreshTokenResponse>(
                GET_REFRESH_TOKEN_URL,
                { refresh: refreshToken }
            )
        );
    }
}
