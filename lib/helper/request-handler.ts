import axios from 'axios';
import {GoCardlessClientError} from "../error/GoCardlessClientError";

export async function handleGoCardlessRequest<T>(fn: () => Promise<{ data: T }>): Promise<T> {
    try {
        const response = await fn();
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new GoCardlessClientError(error);
        }

        throw error;
    }
}