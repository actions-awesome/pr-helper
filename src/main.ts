import { getInput, setOutput } from '@actions/core'
import delimiter from './delimiter'
import { ACTIONS } from './constants'
import { actions } from './actions'
import { log, createHelperError } from './utils'

log('Started')

const action = getInput(ACTIONS, { required: true })

const actionList = action.split(delimiter)

main()

async function main() {
  try {
    await Promise.all(
      actionList.map(async (action) => {
        try {
          await dispatchAction(action)
        } catch (e) {
          setOutput(action, false)
          throw e
        }
      })
    )
  } catch (e) {
    log((e as Error).message)
  }
}

async function dispatchAction(name: string) {
  const actionHandler = actions[name]
  if (!actionHandler) {
    createHelperError(`Action name: ${name} is not supported,
  please refer to the documentation.`)
  }
  return actionHandler()
}
