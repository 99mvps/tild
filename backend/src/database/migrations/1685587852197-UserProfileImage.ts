import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProfileImage1685587852197 implements MigrationInterface {
  name = "UserProfileImage1685587852197";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "profile_image" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_image"`);
  }
}
