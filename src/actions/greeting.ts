import { getInput, setFailed } from '@actions/core'
import client from './client'
import context from './context'
import meta from '../meta'
import { GREETING_MSG, GREETING_GUIDELINE_ADDRESS } from '../constants'
import { log } from '../utils'

/**
 * Greetings to user who opens an issue or a PR.
 * Basic usage:
 *
 *  with:
 *   actions: add-assignees, add-reviewers
 *   assignees: JeremyWuuuuu
 *   greeting-message: Hello %user%, thank you for contributing to %repo%, please follow the %guideline% to see how to contribute to %repo%
 * @returns void
 */
export const greetings = async () => {
  if (context.payload.action !== 'opened') {
    log(`early termination for existed PR`)
    return
  }
  const { sender } = context.payload
  if (!sender) {
    setFailed('No valid sender presented')
    return
  }
  let greetings = getInput(GREETING_MSG)
  let guidelineAddress = getInput(GREETING_GUIDELINE_ADDRESS)
  log(`original greeting string: ${greetings}`)

  const { repo, owner } = meta

  greetings = greetings
    .replace(/%repo%/g, repo)
    .replace(/%user%/g, `@${sender.login}`)
    .replace(/%guideline%/g, guidelineAddress)

  try {
    await client.issues.createComment({
      owner,
      repo,
      issue_number: context.issue.number,
      body: greetings,
    })
  } catch (e) {
    const msg = (e as Error).message
    log(`Greeting error: ${msg}`)
    setFailed(msg)
  }

  log(`Greeting set to: ${greetings}`)
}
