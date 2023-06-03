import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { UserRoles } from "./user.enum";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 150,
  })
  name: string;

  @Column({ unique: true, length: 64 })
  email: string;

  @Column({
    type: "enum",
    enum: UserRoles,
  })
  role: UserRoles;

  @Column()
  password: string;

  @Column({ name: "profile_image", default: null })
  profileImage?: string;

  @Column({ name: "code_conduct_accept", default: null })
  codeConductAccept: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;
}
