export type ErrorResponse = {
    summary: string;
    detail: string;
    status_code: number;
    type?: string;
};

export const errorKeys = ['summary', 'detail', 'status_code', 'type']
