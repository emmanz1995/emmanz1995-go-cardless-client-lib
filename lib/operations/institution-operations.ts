import type { AxiosInstance } from "axios";
import {Institution} from "../model/Institution";

export interface InstitutionOperations {
    getInstitutionsByCountry(countryCode: string): Promise<Institution[]>;
}

export class InstitutionOperationsImpl implements InstitutionOperations {
    private axios: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axios = axiosInstance;
    }

    async getInstitutionsByCountry(countryCode: string): Promise<Institution[]> {
        try {
            const response = await this.axios.get<Institution[]>(
                `/api/v2/institutions/`,
                {
                    params: { country: countryCode },
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error(`Failed to fetch institutions for country ${countryCode}:`, error);
            throw error;
        }
    }
}

