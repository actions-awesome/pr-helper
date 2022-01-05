import { setOutput } from '@actions/core'
import { log } from './utils'
import {
  ADD_ASSIGNEES,
  ADD_LABELS,
  ADD_REVIEWERS,
  CREATE_COMMENT,
} from './constants'
import { addAssignees } from './actions/index'

type ActionHandlers = {
  [key: string]: () => any
}

const createActionWithHook = (name: string, action: ActionHandlers[string]) => {
  return async () => {
    log(`action name: ${name} started`)
    // Not catching it is intended because we want the error to be thrown.
    await action()

    log(`action name: ${name} dispatched successfully`)
    setOutput(name, true)
  }
}

export const actions: ActionHandlers = {
  [ADD_ASSIGNEES]: createActionWithHook(ADD_REVIEWERS, addAssignees),
  [ADD_LABELS]: () => {},
  [ADD_REVIEWERS]: () => {},
  [CREATE_COMMENT]: () => {},
}
