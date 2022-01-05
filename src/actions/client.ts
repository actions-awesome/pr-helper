import { getInput } from '@actions/core'
import { Octokit } from '@octokit/rest'

const token = getInput('token') || process.env.GITHUB_TOKEN

export default new Octokit({
  auth: `token ${token}`,
})
