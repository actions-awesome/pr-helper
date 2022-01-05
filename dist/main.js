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
const core_1 = require("@actions/core");
const delimiter_1 = __importDefault(require("./delimiter"));
const constants_1 = require("./constants");
const actions_1 = require("./actions");
const utils_1 = require("./utils");
(0, utils_1.log)('Started');
const action = (0, core_1.getInput)(constants_1.ACTIONS, { required: true });
const actionList = action.split(delimiter_1.default);
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const action of actionList) {
            try {
                yield dispatchAction(action);
            }
            catch (e) {
                (0, core_1.setOutput)(action, false);
                throw new utils_1.PrHelperError(e.message);
            }
        }
    });
}
function dispatchAction(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const actionHandler = actions_1.actions[name];
        if (actionHandler)
            return actionHandler();
        return Promise.reject(`Action name: ${name} is not supported,
  please refer to the document.
  `);
    });
}
