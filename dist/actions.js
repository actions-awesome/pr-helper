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
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const core_1 = require("@actions/core");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const index_1 = require("./actions/index");
const createActionWithHook = (name, action) => {
    return () => __awaiter(void 0, void 0, void 0, function* () {
        (0, utils_1.log)(`action name: ${name} started`);
        // Not catching it is intended because we want the error to be thrown.
        yield action();
        (0, utils_1.log)(`action name: ${name} dispatched successfully`);
        (0, core_1.setOutput)(name, true);
    });
};
exports.actions = {
    [constants_1.ADD_ASSIGNEES]: createActionWithHook(constants_1.ADD_REVIEWERS, index_1.addAssignees),
    [constants_1.ADD_LABELS]: () => { },
    [constants_1.ADD_REVIEWERS]: () => { },
    [constants_1.CREATE_COMMENT]: () => { },
};
