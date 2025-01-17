import { MigrationInterface, QueryRunner } from "typeorm";

export class Six1736841077942 implements MigrationInterface {
    name = 'Six1736841077942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_settings" DROP CONSTRAINT "FK_5a8ffc3b89343043c9440d631e2"`);
        await queryRunner.query(`ALTER TABLE "notification_settings" DROP CONSTRAINT "REL_5a8ffc3b89343043c9440d631e"`);
        await queryRunner.query(`ALTER TABLE "notification_settings" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "notificationSettingsId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_c7200f875c85854fc098cf04e50" UNIQUE ("notificationSettingsId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c7200f875c85854fc098cf04e50" FOREIGN KEY ("notificationSettingsId") REFERENCES "notification_settings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c7200f875c85854fc098cf04e50"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_c7200f875c85854fc098cf04e50"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "notificationSettingsId"`);
        await queryRunner.query(`ALTER TABLE "notification_settings" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "notification_settings" ADD CONSTRAINT "REL_5a8ffc3b89343043c9440d631e" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "notification_settings" ADD CONSTRAINT "FK_5a8ffc3b89343043c9440d631e2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
