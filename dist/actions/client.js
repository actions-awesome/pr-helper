"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const rest_1 = require("@octokit/rest");
const token = (0, core_1.getInput)('token') || process.env.GITHUB_TOKEN;
exports.default = new rest_1.Octokit({
    auth: `token ${token}`,
});
