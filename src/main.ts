import { getInput, setOutput } from '@actions/core'
import delimiter from './delimiter'
import { ACTIONS } from './constants'
import { actions } from './actions'
import { log, PrHelperError } from './utils'

log('Started')

const action = getInput(ACTIONS, { required: true })

const actionList = action.split(delimiter)

main()

async function main() {
  for (const action of actionList) {
    try {
      await dispatchAction(action)
    } catch (e) {
      setOutput(action, false)
      throw new PrHelperError((e as Error).message)
    }
  }
}

async function dispatchAction(name: string) {
  const actionHandler = actions[name]
  if (actionHandler) return actionHandler()
  return Promise.reject(`Action name: ${name} is not supported,
  please refer to the document.
  `)
}
