import { MigrationInterface, QueryRunner } from "typeorm";

export class Ten1739976675564 implements MigrationInterface {
    name = 'Ten1739976675564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9b569c58b3743dde4e349dbd019"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "UQ_9b569c58b3743dde4e349dbd019"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "settingsId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" ADD "settingsId" uuid`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "UQ_9b569c58b3743dde4e349dbd019" UNIQUE ("settingsId")`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_9b569c58b3743dde4e349dbd019" FOREIGN KEY ("settingsId") REFERENCES "notification_settings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
