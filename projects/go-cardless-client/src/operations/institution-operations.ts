import type { AxiosInstance } from "axios";
import {handleGoCardlessRequest} from "../helper/request-handler";
import {Institution} from "go-cardless-core/dist/model/Institution";

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

