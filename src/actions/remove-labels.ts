import { getInput } from '@actions/core'
import { LABELS, LABEL_ONLY_IF, LABELS_TO_REMOVE, PR_NUMBER } from '../constants'
import { log, toList } from '../utils'
import client from './client'
import context from './context'
export const removeLabels = async () => {
  const rawLabels = getInput(LABELS) || getInput(LABELS_TO_REMOVE)
  const rawShouldLabel = getInput(LABEL_ONLY_IF)
  log(`rawLabels: ${rawLabels}`)
  // when label condition is presented, we check the condition's value
  // If not true then we simply terminates it
  if (rawShouldLabel !== '' && rawShouldLabel !== 'true') {
    log(`Labels not set because of label-only-if was set and not true`)
    return
  }

  const labels = toList(rawLabels)

  const {
    repo: { repo, owner },
  } = context

  const issue_number = Number(getInput(PR_NUMBER)) || context.issue.number

  try {
    await Promise.all(
      labels.map(async (name) => {
        await client.issues.removeLabel({
          name,
          owner,
          issue_number,
          repo,
        })

        log(`Labels: ${labels} removed successfully`)
      })
    )
  } catch (e) {
    log((e as Error).message)
  }
}
