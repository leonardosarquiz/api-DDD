import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from '../../../../../test/factories/make-question'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe("Edit Question", () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })



  it('should be able to edit a question', async () => {

    const newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)


    await sut.execute({
      authorId: 'author-1',
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
      questionId: newQuestion.id.toValue()
    })


    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
    })


  })




  it('should not be able to edit a question from another user', async () => {

    const newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)


    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        title: 'Pergunta teste',
        content: 'Conteúdo teste',
        questionId: newQuestion.id.toValue()
      })
    }).rejects.toBeInstanceOf(Error)

  })
})
