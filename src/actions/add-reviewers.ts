import { getInput } from '@actions/core'
import client from './client'
import meta from '../meta'
import { REVIEWERS } from '../constants'
import { toList, assertListNotEmpty, log } from '../utils'

export const addReviewers = async () => {
  const rawReviewers = getInput(REVIEWERS)
  log(`Reviewers string: ${rawReviewers}`)
  const reviewers = toList(rawReviewers)
  assertListNotEmpty('Reviewers', reviewers)
  const { repo, pr, owner } = meta
  await client.pulls.requestReviewers({
    repo,
    owner,
    pull_number: pr,
    reviewers,
  })
  log(`Reviewers set to: ${rawReviewers}`)
}
