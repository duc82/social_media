import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./messages.entity";
import { FileType } from "src/enums/file.enum";

@Entity({
  name: "message_files",
})
export class MessageFile extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @Column()
  path: string;

  @Column({
    type: "enum",
    enum: FileType,
  })
  type: FileType;

  @ManyToOne(() => Message, (message) => message.files, {
    onDelete: "CASCADE",
  })
  message: Message;
}
