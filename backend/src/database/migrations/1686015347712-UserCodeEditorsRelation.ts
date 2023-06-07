import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCodeEditorsRelation1686015347712 implements MigrationInterface {
    name = 'UserCodeEditorsRelation1686015347712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "code_editor" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "code_editor" ADD CONSTRAINT "FK_216aef25fe23e2a54919ac6354a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "code_editor" DROP CONSTRAINT "FK_216aef25fe23e2a54919ac6354a"`);
        await queryRunner.query(`ALTER TABLE "code_editor" DROP COLUMN "userId"`);
    }

}
