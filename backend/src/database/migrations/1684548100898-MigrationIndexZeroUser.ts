import { MigrationInterface, QueryRunner } from "typeorm";
export class MigrationIndexZeroUser1684548100898 implements MigrationInterface {
  name = "MigrationIndexZeroUser1684548100898";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          insert into users 
          (
            id,
            name,
            email,
            "role",
            "password",
            created_at,
            updated_at
          )
          values (
            '0d184f2f-cac4-48e8-be05-8d0a5dbb3ba9',
            'Index Zero',
            'root@99mvps.dev',
            'admin',
            '$2y$10$JX6CL.Al0mdKOq3HSaq4Dud3/RxEqNJDEsfC72LgPD1cwCiv1bag2',
            '2023-02-23 11:27:55.87583',
            '2023-02-23 11:27:55.87583'
          );
        `);

    await queryRunner.query(`
        insert into users 
        (
          id,
          name,
          email,
          "role",
          "password",
          created_at,
          updated_at
        )
        values (
          '1d184f2f-cac4-48e8-be05-8d0a5dbb3ba9',
          'Index One',
          'root+one@99mvps.dev',
          'streamer',
          '$2y$10$JX6CL.Al0mdKOq3HSaq4Dud3/RxEqNJDEsfC72LgPD1cwCiv1bag2',
          '2023-02-23 11:27:55.87583',
          '2023-02-23 11:27:55.87583'
        );
      `);
    await queryRunner.query(`
      insert into users 
      (
        id,
        name,
        email,
        "role",
        "password",
        created_at,
        updated_at
      )
      values (
        '2d184f2f-cac4-48e8-be05-8d0a5dbb3ba9',
        'Index Two',
        'root+two@99mvps.dev',
        'user',
        '$2y$10$JX6CL.Al0mdKOq3HSaq4Dud3/RxEqNJDEsfC72LgPD1cwCiv1bag2',
        '2023-02-23 11:27:55.87583',
        '2023-02-23 11:27:55.87583'
      );
    `);

    await queryRunner.query(`
    insert into users 
    (
      id,
      name,
      email,
      "role",
      "password",
      created_at,
      updated_at
    )
    values (
      '3d184f2f-cac4-48e8-be05-8d0a5dbb3ba9',
      'Index Three',
      'root+three@99mvps.dev',
      'user',
      '$2y$10$JX6CL.Al0mdKOq3HSaq4Dud3/RxEqNJDEsfC72LgPD1cwCiv1bag2',
      '2023-02-23 11:27:55.87583',
      '2023-02-23 11:27:55.87583'
    );
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE id = '8d184f2f-cac4-48e8-be05-8d0a5dbb3ba9'`);
  }
}
