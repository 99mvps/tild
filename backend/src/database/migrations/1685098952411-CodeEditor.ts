import { MigrationInterface, QueryRunner } from "typeorm";

export class CodeEditor1685098952411 implements MigrationInterface {
  name = "CodeEditor1685098952411";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table "code_editor" 
        ("id" uuid not null default uuid_generate_v4(),
        "title" character varying(150) not null,
        "live" boolean not null default false,
        "lang" "public"."code_editor_lang_enum" default null,
        "created_at" TIMESTAMP not null default now(),
        "updated_at" TIMESTAMP not null default now(),
        "deleted_at" TIMESTAMP default null,
        constraint "PK_01477bc694061ca5b3f920292f9" primary key ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "code_editor"`);
  }
}
