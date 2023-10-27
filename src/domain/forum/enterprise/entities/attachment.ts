import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";


interface AttachmentProps {
  title: string
  link: string

}

export class Attachment extends Entity<AttachmentProps> {

  get title() {
    return this.props.title
  }


  get link() {
    return this.props.title
  }


  static create(props: Attachment, id?: UniqueEntityId) {
    const attachment = new Attachment(props, id)


    return attachment
  }
}