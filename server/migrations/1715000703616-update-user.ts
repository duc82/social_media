import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1715000703616 implements MigrationInterface {
    name = 'UpdateUser1715000703616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "emailVerified" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailVerified"`);
    }

}
