
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';


interface FetchAnswerCommentsRequestUseCase {
  answerId: string
  page: number
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private AnswerCommentsRepository: AnswerCommentsRepository) { }

  async execute({
    answerId,
    page
  }: FetchAnswerCommentsRequestUseCase): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.AnswerCommentsRepository.findManyByAnswerId(answerId, { page })


    return {
      answerComments
    }
  }
}
