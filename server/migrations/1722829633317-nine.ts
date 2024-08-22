import { MigrationInterface, QueryRunner } from "typeorm";

export class Nine1722829633317 implements MigrationInterface {
    name = 'Nine1722829633317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_members" DROP COLUMN "isRead"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_members" ADD "isRead" boolean NOT NULL DEFAULT false`);
    }

}
