"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = require("@actions/github");
const core_1 = require("@actions/core");
const constants_1 = require("./constants");
function getMeta() {
    var _a;
    let owner;
    let repo;
    let pr = github_1.context.issue.number;
    const userInputRepo = (0, core_1.getInput)(constants_1.REPO);
    const isPullRequest = github_1.context.eventName === 'pull_request' ||
        (!!((_a = github_1.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.number) &&
            github_1.context.eventName === 'issue_commented');
    if (isPullRequest) {
        /**
         * according to the source code, the context.issue.number will always be pointed to the correct one.
         * get issue() {
         *   const payload = this.payload;
         *   return Object.assign(Object.assign({}, this.repo), { number: (payload.issue || payload.pull_request || payload).number });
         * }
         */
        pr = Number.parseInt((0, core_1.getInput)(constants_1.PR_NUMBER));
    }
    if (userInputRepo) {
        ;
        [owner, repo] = userInputRepo.split('/');
        return {
            owner,
            repo,
            pr,
        };
    }
    else {
        return Object.assign(Object.assign({}, github_1.context.repo), { pr });
    }
}
exports.default = getMeta();
