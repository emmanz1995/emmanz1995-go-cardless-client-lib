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
const connector_helper_1 = __importDefault(require("./helper/connector-helper"));
exports.default = (fetchParams) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, method, body, access_token } = fetchParams;
    let response;
    try {
        response = yield (0, connector_helper_1.default)(url, method, body, {
            Authorization: `Bearer ${access_token}`,
        });
    }
    catch (err) {
        console.log('Failed to make request to go cardless', err);
        throw new Error('Failed to make request!');
    }
    return response;
});
