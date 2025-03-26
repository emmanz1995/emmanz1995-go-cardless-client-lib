import {errorKeys, ErrorResponse} from "../model/error-response";
import {AxiosError} from "axios";

export type FieldErrorItem = {
    field: string | null;
    summary: string;
    detail: string | null;
};

export class GoCardlessClientError extends Error {
    public readonly statusCode: number | null;
    public readonly fieldErrors: FieldErrorItem[];
    public readonly axiosError: AxiosError;

    constructor(axiosError: AxiosError) {
        const error: ErrorResponse = axiosError?.response?.data as ErrorResponse;
        const statusCode = error.status_code || axiosError.status || null;
        const summary = error?.summary;

        const fieldErrors: FieldErrorItem[] = [];

        // 🔹 Top-level summary/detail error → treat as general/global error
        if (summary) {
            fieldErrors.push({
                field: null,
                summary,
                detail: error?.detail || null,
            });
        }

        // 🔹 Now normalize field-level errors
        for (const key in error) {
            if (errorKeys.includes(key)) continue;

            const value = (error as any)[key];

            if (Array.isArray(value)) {
                for (const item of value) {
                    if (typeof item === 'string') {
                        fieldErrors.push({ field: key, summary: item, detail: null });
                    } else if (item?.summary) {
                        fieldErrors.push({ field: key, summary: item.summary, detail: item.detail ?? null });
                    }
                }
            } else if (value?.summary) {
                fieldErrors.push({ field: key, summary: value.summary, detail: value.detail ?? null });
            }
        }

        super(summary || 'GoCardless API Error');
        this.name = 'GoCardlessClientError';
        this.statusCode = statusCode;
        this.fieldErrors = fieldErrors;
        this.axiosError = axiosError;
    }
}

