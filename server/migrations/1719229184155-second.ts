import { MigrationInterface, QueryRunner } from "typeorm";

export class Second1719229184155 implements MigrationInterface {
    name = 'Second1719229184155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_members" ADD "seen" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_members" DROP COLUMN "seen"`);
    }

}
