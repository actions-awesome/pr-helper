import { getInput } from '@actions/core'
import meta from '../meta'
import { ASSIGNEES } from '../constants'
import { toList, assertListNotEmpty, log } from '../utils'
import client from './client'

export const addAssignees = async () => {
  const rawAssignees = getInput(ASSIGNEES)
  log(`assignees string: ${rawAssignees}`)
  const assignees = toList(rawAssignees)
  assertListNotEmpty('Assignees', assignees)
  const { repo, pr, owner } = meta
  await client.issues.addAssignees({
    repo,
    owner,
    issue_number: pr,
    assignees,
  })
  log(`Assignees set to: ${rawAssignees}`)
}
