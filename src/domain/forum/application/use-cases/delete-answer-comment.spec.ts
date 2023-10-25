
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'

import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteAnswerCommentUseCase } from './dele-answer-comment'
import { NotAllowedError } from './errors/not-allowed-error'


let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe("Delete Answer Comment", () => {

  beforeEach(() => {

    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })



  it('should be able to comment on answer', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })


    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)


  })


  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-1')
    })

    await inMemoryAnswerCommentsRepository.create(answerComment)


    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-2',
    })


    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  })

})
