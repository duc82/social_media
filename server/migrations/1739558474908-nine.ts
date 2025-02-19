import { MigrationInterface, QueryRunner } from "typeorm";

export class Nine1739558474908 implements MigrationInterface {
    name = 'Nine1739558474908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_settings" ADD "followers" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_settings" DROP COLUMN "followers"`);
    }

}
