"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertListNotEmpty = exports.createHelperError = exports.toList = exports.log = exports.PrHelperError = void 0;
const core_1 = require("@actions/core");
const delimiter_1 = __importDefault(require("./delimiter"));
const NAME = 'PR Helper';
class PrHelperError extends Error {
    constructor(message) {
        super(`${NAME} Error: ${message}`);
    }
}
exports.PrHelperError = PrHelperError;
const log = (msg) => {
    (0, core_1.info)(`${NAME}: ${msg}`);
};
exports.log = log;
const toList = (str) => str.split(delimiter_1.default).map(String.prototype.trim);
exports.toList = toList;
const createHelperError = (msg) => {
    throw new PrHelperError(msg);
};
exports.createHelperError = createHelperError;
const assertListNotEmpty = (name, list) => {
    if (list.length === 0) {
        (0, exports.createHelperError)(`${name} list cannot be empty`);
    }
};
exports.assertListNotEmpty = assertListNotEmpty;
