// This was originated from https://github.com/actions-cool/maintain-one-comment/blob/main/src/main.js
// With one addition when `body == null` and comments.length == 0, skip update
import { getInput, setOutput, setFailed } from '@actions/core'
import context from './context'
import client from './client'
import meta from '../meta'
import { log } from '../utils'
import { BODY_FILTER, COMMENT_BODY } from '../constants'

export async function maintainComment() {
  try {

    const body = getInput(COMMENT_BODY)

    const { repo, owner } = meta

    const bodyFilter = getInput(BODY_FILTER)

    const { number } = context.issue

    async function listComments(page = 1) {
      let { data: comments } = await client.issues.listComments({
        owner,
        repo,
        issue_number: number,
        per_page: 100,
        page,
      })
      if (comments.length >= 100) {
        comments = comments.concat(await listComments(page + 1))
      }
      return comments
    }

    type Comment = {
      id: number
      auth?: string
      body?: string
    }
    const commentList = await listComments()
    let comments: Comment[] = []
    commentList.forEach((item) => {
      const target = bodyFilter ? item.body?.includes(bodyFilter) : true
      if (target) {
        comments.push({
          id: item.id,
          auth: item.user?.login,
          body: item.body,
        })
      }
    })

    log(`comments: ${JSON.stringify(comments)}`)
    log(`comments-length: ${comments.length}`)

    if (comments.length === 0 && body) {
      const { data } = await client.issues.createComment({
        owner,
        repo,
        issue_number: number,
        body,
      })
      setOutput('comment-id', data.id)
    } else if (comments.length === 1) {
      let commentId = comments[0].id
      if (!body) {
        await client.issues.deleteComment({
          owner,
          repo,
          comment_id: commentId,
        })
        log(`Actions: [delete-comment][${commentId}] success!`)
        return false
      }

      let params = {
        owner,
        repo,
        comment_id: commentId,
        body,
      }

      await client.issues.updateComment(params)
      setOutput('comment-id', commentId)
      log(`Actions: [update-comment][${params.body}] success!`)
    } else {
      let length = comments.length
      log(`The comments length is ${length}.`)
    }
  } catch (error) {
    setFailed((error as Error).message)
  }
}
