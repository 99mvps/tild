import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1684548032541 implements MigrationInterface {
  name = "Users1684548032541";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user', 'streamer')`
    );
    await queryRunner.query(
      `create table "users" ("id" uuid not null default uuid_generate_v4(),
      "name" character varying(150) not null,
      "email" character varying(64) not null,
      "role" "public"."users_role_enum" not null,
      "password" character varying not null,
      "created_at" TIMESTAMP not null default now(),
      "updated_at" TIMESTAMP default null,
      "deleted_at" TIMESTAMP default null,
      constraint "UQ_97672ac88f789774dd47f7c8be3" unique ("email"),
      constraint "PK_a3ffb1c0c8416b9fc6f907b7433" primary key ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
