"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const constants_1 = require("./constants");
const defaultDelimiter = ',';
exports.default = (0, core_1.getInput)(constants_1.DELIMITER) || defaultDelimiter;
