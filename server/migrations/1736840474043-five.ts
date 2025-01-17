import { MigrationInterface, QueryRunner } from "typeorm";

export class Five1736840474043 implements MigrationInterface {
    name = 'Five1736840474043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_settings" DROP CONSTRAINT "FK_5a8ffc3b89343043c9440d631e2"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_2d69981b419fe03231a32f60956"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "friendId"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "settingsId" uuid`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "UQ_9b569c58b3743dde4e349dbd019" UNIQUE ("settingsId")`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."notifications_type_enum" AS ENUM('like', 'comment', 'friend_request', 'accepted_friend_request', 'birthday', 'group')`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "type" "public"."notifications_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification_settings" ADD CONSTRAINT "FK_5a8ffc3b89343043c9440d631e2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_9b569c58b3743dde4e349dbd019" FOREIGN KEY ("settingsId") REFERENCES "notification_settings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9b569c58b3743dde4e349dbd019"`);
        await queryRunner.query(`ALTER TABLE "notification_settings" DROP CONSTRAINT "FK_5a8ffc3b89343043c9440d631e2"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "UQ_9b569c58b3743dde4e349dbd019"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "settingsId"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "friendId" uuid`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_2d69981b419fe03231a32f60956" FOREIGN KEY ("friendId") REFERENCES "friends"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification_settings" ADD CONSTRAINT "FK_5a8ffc3b89343043c9440d631e2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
