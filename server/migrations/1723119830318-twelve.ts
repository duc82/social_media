import { MigrationInterface, QueryRunner } from "typeorm";

export class Twelve1723119830318 implements MigrationInterface {
    name = 'Twelve1723119830318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_members" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_members" DROP COLUMN "deletedAt"`);
    }

}
