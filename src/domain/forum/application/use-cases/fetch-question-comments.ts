
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';


interface FetchQuestionCommentsRequestUseCase {
  questionId: string
  page: number
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(private QuestionCommentsRepository: QuestionCommentsRepository) { }

  async execute({
    questionId,
    page
  }: FetchQuestionCommentsRequestUseCase): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.QuestionCommentsRepository.findManyByQuestionId(questionId, { page })


    return {
      questionComments
    }
  }
}
