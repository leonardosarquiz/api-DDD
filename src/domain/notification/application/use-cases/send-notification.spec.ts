import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { SendNotificationUseCase } from './send-notfication'


let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe("Send Notification", () => {

  beforeEach(() => {

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })



  it('should be able to send a notification', async () => {


    const result = await sut.execute({
      recipientId: '1',
      content: 'content notification',
      title: 'new notification',

    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(result.value?.notification)


  })

})
