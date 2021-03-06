import { setOutput } from '@actions/core'
import { log } from './utils'
import {
  ADD_ASSIGNEES,
  ADD_LABELS,
  ADD_REVIEWERS,
  REMOVE_LABELS,
  GREETING,
  MAINTAIN_COMMENT,
} from './constants'
import {
  addAssignees,
  addReviewers,
  addLabels,
  greetings,
  removeLabels,
  maintainComment,
} from './actions/index'

type ActionHandlers = {
  [key: string]: () => any
}

const createActionWithHook = (
  name: string,
  handler: ActionHandlers[string]
) => {
  return async () => {
    log(`action name: ${name} started`)
    // Not catching it is intended because we want the error to be thrown.
    await handler()

    log(`action name: ${name} dispatched successfully`)
    setOutput(name, true)
  }
}

export const actions: ActionHandlers = {
  [ADD_ASSIGNEES]: createActionWithHook(ADD_ASSIGNEES, addAssignees),
  [ADD_LABELS]: createActionWithHook(ADD_LABELS, addLabels),
  [ADD_REVIEWERS]: createActionWithHook(ADD_REVIEWERS, addReviewers),
  [REMOVE_LABELS]: createActionWithHook(REMOVE_LABELS, removeLabels),
  // [CREATE_COMMENT]: () => {},
  [GREETING]: createActionWithHook(GREETING, greetings),
  [MAINTAIN_COMMENT]: createActionWithHook(MAINTAIN_COMMENT, maintainComment),
}
