"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoCardlessClient = void 0;
const auth_operations_1 = require("./operations/auth-operations");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_token_manager_1 = require("./helper/auth-token-manager");
const auth_interceptor_1 = require("./helper/auth-interceptor");
const institution_operations_1 = require("./operations/institution-operations");
dotenv_1.default.config();
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
const axiosInstance = axios_1.default.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});
const authOperations = new auth_operations_1.AuthOperationsImpl(axiosInstance);
const tokenManager = new auth_token_manager_1.AccessTokenManager(authOperations, secretId, secretKey);
// 🚀 Attach interceptors
(0, auth_interceptor_1.setupAuthInterceptors)(axiosInstance, tokenManager);
class GoCardlessClient {
    constructor() {
        this.institutions = new institution_operations_1.InstitutionOperationsImpl(axiosInstance);
    }
}
exports.GoCardlessClient = GoCardlessClient;
