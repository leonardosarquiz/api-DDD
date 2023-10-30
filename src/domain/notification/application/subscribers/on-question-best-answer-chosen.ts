import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { QuestionRepository } from "@/domain/forum/application/repositories/questions-repository";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/events/answer-created-event";
import { SendNotificationUseCase } from "../use-cases/send-notfication";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { QuestionBestAnswerChoseEvent } from "@/domain/forum/enterprise/events/question-best-answer-chosen-event";


export class OnQuestionBestAnswerChosen implements EventHandler {

  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase

  ) {
    this.setupSubscriptions()
  }
  setupSubscriptions(): void {
    DomainEvents.register(this.sendQuestionBestNotification.bind(this), QuestionBestAnswerChoseEvent.name)
  }


  private async sendQuestionBestNotification({ question, bestAnswerId }: QuestionBestAnswerChoseEvent) {
    const answer = await this.answersRepository.findById(bestAnswerId.toString())

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida!`,
        content: `A resposta que você enviou em "${question.title.substring(0, 20).concat('...')}" foi escolhida pelo autor!`
      })
    }


  }
}