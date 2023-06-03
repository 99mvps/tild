import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAcceptCodeOfConduct1685813154596 implements MigrationInterface {
  name = "UserAcceptCodeOfConduct1685813154596";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "code_conduct_accept" boolean`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "code_conduct_accept"`);
  }
}
