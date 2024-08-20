import { MigrationInterface, QueryRunner } from "typeorm";

export class Four1721045087934 implements MigrationInterface {
    name = 'Four1721045087934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "offlineAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "offlineAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "offlineAt"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "offlineAt" TIMESTAMP WITH TIME ZONE`);
    }

}
