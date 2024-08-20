import { MigrationInterface, QueryRunner } from "typeorm";

export class Seven1721897228510 implements MigrationInterface {
    name = 'Seven1721897228510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_username_users" ON "users" ("username") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_username_users"`);
    }

}
