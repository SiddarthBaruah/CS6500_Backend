import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "messages" })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  sender: string;

  @Column({ nullable: false })
  receiver: string;

  @Column({ type: "json", nullable: true })
  signedMessage?: Record<string, any>;
}
