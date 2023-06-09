import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { Langs } from "./code-editor.enum";
import { User } from "src/users/user.entity";

@Entity("code_editor")
export class CodeEditor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 150,
  })
  title: string;

  @Column({
    default: false,
  })
  live: boolean;

  @Column({
    type: "enum",
    enum: Langs,
    default: null,
  })
  lang?: Langs;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.codeEditors)
  user: User;
}
