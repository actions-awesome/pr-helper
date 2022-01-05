import { info } from '@actions/core'
import delimiter from './delimiter'
const NAME = 'PR Helper'

export class PrHelperError extends Error {
  constructor(message?: string) {
    super(`${NAME} Error: ${message}`)
  }
}

export const log = (msg: string) => {
  info(`${NAME}: ${msg}`)
}

export const toList = (str: string) => str.split(delimiter).map((s) => s.trim())

export const createHelperError = (msg: string) => {
  throw new PrHelperError(msg)
}

export const assertListNotEmpty = (name: string, list: string[]) => {
  if (list.length === 0) {
    createHelperError(`${name} list cannot be empty`)
  }
}
