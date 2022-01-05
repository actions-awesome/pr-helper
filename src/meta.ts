import { context } from '@actions/github'
import { getInput } from '@actions/core'
import { REPO, PR_NUMBER } from './constants'

function getMeta() {
  let owner: string
  let repo: string
  let pr: number = context.issue.number

  const userInputRepo = getInput(REPO)
  const isPullRequest =
    context.eventName === 'pull_request' ||
    (!!context.payload.pull_request?.number &&
      context.eventName === 'issue_commented')

  if (isPullRequest) {
    /**
     * according to the source code, the context.issue.number will always be pointed to the correct one.
     * get issue() {
     *   const payload = this.payload;
     *   return Object.assign(Object.assign({}, this.repo), { number: (payload.issue || payload.pull_request || payload).number });
     * }
     */
    pr = Number.parseInt(getInput(PR_NUMBER))
  }

  if (userInputRepo) {
    ;[owner, repo] = userInputRepo.split('/')
    return {
      owner,
      repo,
      pr,
    }
  } else {
    return { ...context.repo, pr }
  }
}

export default getMeta()
