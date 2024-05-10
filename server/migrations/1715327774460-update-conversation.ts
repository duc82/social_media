import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateConversation1715327774460 implements MigrationInterface {
    name = 'UpdateConversation1715327774460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversations" ADD "name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversations" DROP COLUMN "name"`);
    }

}
