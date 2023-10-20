import { Answer } from "../../enterprise/entities/answer";
import { Question } from "../../enterprise/entities/question";

export interface QuestionRepository {
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  save(question: Question): Promise<void>
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}