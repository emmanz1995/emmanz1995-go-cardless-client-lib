import {AuthOperations, AuthOperationsImpl} from "./operations/auth-operations";
import axios from "axios";
import dotenv from 'dotenv';
import { AccessTokenManager } from "./helper/auth-token-manager";
import { setupAuthInterceptors } from "./helper/auth-interceptor";
import {InstitutionOperations, InstitutionOperationsImpl} from "./operations/institution-operations";

dotenv.config()

const baseUrl = process.env.GO_CARDLESS_BASE_URL;
const secretId = process.env.GO_CARDLESS_SECRET_ID;
const secretKey = process.env.GO_CARDLESS_SECRET_KEY;

if (!baseUrl) {
    throw new Error('Missing BASE_URL');
}

if (!secretId) {
    throw new Error('Missing SECRET_ID');
}

if (!secretKey) {
    throw new Error('Missing SECRET_KEY');
}

const axiosAuthInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});

const authOperations: AuthOperations = new AuthOperationsImpl(axiosAuthInstance)
const tokenManager = new AccessTokenManager(
    authOperations,
    secretId,
    secretKey,
);

// 🚀 Attach interceptors
const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});
setupAuthInterceptors(axiosInstance, tokenManager);

export class GoCardlessClient {
    institutions: InstitutionOperations = new InstitutionOperationsImpl(axiosInstance)
}
