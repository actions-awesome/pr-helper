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
exports.addAssignees = void 0;
const core_1 = require("@actions/core");
const meta_1 = __importDefault(require("../meta"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const client_1 = __importDefault(require("./client"));
const addAssignees = () => __awaiter(void 0, void 0, void 0, function* () {
    const rawAssignees = (0, core_1.getInput)(constants_1.ASSIGNEES);
    const assignees = (0, utils_1.toList)(rawAssignees);
    (0, utils_1.assertListNotEmpty)('Assignees', assignees);
    const { repo, pr, owner } = meta_1.default;
    return client_1.default.issues.addAssignees({
        repo,
        owner,
        issue_number: pr,
        assignees,
    });
});
exports.addAssignees = addAssignees;
