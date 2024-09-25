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
exports.default = (url, method, body, headers) => __awaiter(void 0, void 0, void 0, function* () {
    const headerOpts = Object.assign({ 'content-type': 'application/json', Accept: 'application/json' }, headers);
    let data;
    try {
        ({ data } = yield (0, axios_1.default)(Object.assign(Object.assign({ url,
            method }, (body ? { data: JSON.stringify(body) } : null)), { headers: headerOpts })));
    }
    catch (err) {
        console.log('Failed to make request', err);
        throw new Error('Failed to make request');
    }
    return data;
});
