
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChoseQuestionBestAnswerUseCase } from './chose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'


let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChoseQuestionBestAnswerUseCase

describe("Choose Question Best Answer", () => {

  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryAnswersAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswersAttachmentsRepository)
    sut = new ChoseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository)
  })



  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString()
    })


    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)


  })




  it('should not be able to choose another user question best answer', async () => {

    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    })
    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)



    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2'
    })


    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceof(NotAllowedError)

  })
})
