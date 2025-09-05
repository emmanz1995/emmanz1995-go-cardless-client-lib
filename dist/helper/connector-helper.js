"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const fetchTokens_1 = require("../fetchTokens");
dotenv_1.default.config();
let accessToken = null;
exports.default = (url, method, body) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!accessToken)
        accessToken = yield (0, fetchTokens_1.getAccessToken)();
    const headerOpts = {
        'content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
    };
    let data;
    try {
        ({ data } = yield (0, axios_1.default)(Object.assign(Object.assign({ url,
            method }, (body ? { data: JSON.stringify(body) } : null)), { headers: headerOpts })));
    }
    catch (err) {
        console.warn('Access token expired. Refreshing...');
        if (((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.status) === 401) {
            try {
                accessToken = yield (0, fetchTokens_1.refreshTokens)();
                const headerOpts = {
                    'content-type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                };
                const { data } = yield (0, axios_1.default)(Object.assign(Object.assign({ url,
                    method }, (body ? { data: JSON.stringify(body) } : null)), { headers: headerOpts }));
                return data;
            }
            catch (err) {
                console.error('Unable to refresh token', err);
                throw new Error('Unable to refresh token');
            }
        }
        console.error(`API request failed: ${method} ${url}`, err);
        throw new Error(err.message);
    }
    return data;
});
