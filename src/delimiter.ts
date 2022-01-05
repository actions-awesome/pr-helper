import { getInput } from '@actions/core'
import { DELIMITER } from './constants'

const defaultDelimiter = ','
export default getInput(DELIMITER) || defaultDelimiter
