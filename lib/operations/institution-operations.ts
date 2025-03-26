import type { AxiosInstance } from "axios";
import {Institution} from "../model/Institution";
import {handleGoCardlessRequest} from "../helper/request-handler";
import {AccessTokenResponse} from "../model/auth-token-response";

const GET_INSTITUTIONS_URL = `/api/v2/institutions/`

export interface InstitutionOperations {
    getInstitutionsByCountry(countryCode: string): Promise<Institution[]>;
}

export class InstitutionOperationsImpl implements InstitutionOperations {
    private axiosClient: AxiosInstance;

    constructor(axiosClient: AxiosInstance) {
        this.axiosClient = axiosClient;
    }

    async getInstitutionsByCountry(countryCode: string): Promise<Institution[]> {
        return handleGoCardlessRequest(() =>
            this.axiosClient.get<Institution[]>(
                GET_INSTITUTIONS_URL,
                {
                    params: { country: countryCode },
                    headers: {
                        Accept: 'application/json',
                    },
                }
            )
        );
    }
}

