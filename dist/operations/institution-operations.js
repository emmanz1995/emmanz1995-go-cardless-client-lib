"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionOperationsImpl = void 0;
class InstitutionOperationsImpl {
    constructor(axiosInstance) {
        this.axios = axiosInstance;
    }
    async getInstitutionsByCountry(countryCode) {
        console.log('starting1111...');
        try {
            const response = await this.axios.get(`/api/v2/institutions/`, {
                params: { country: countryCode },
                headers: {
                    Accept: 'application/json',
                },
            });
            return response;
        }
        catch (error) {
            console.error(`Failed to fetch institutions for country ${countryCode}:`, error);
            throw error;
        }
    }
}
exports.InstitutionOperationsImpl = InstitutionOperationsImpl;
