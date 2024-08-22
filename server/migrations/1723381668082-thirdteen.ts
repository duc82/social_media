import { MigrationInterface, QueryRunner } from "typeorm";

export class Thirdteen1723381668082 implements MigrationInterface {
    name = 'Thirdteen1723381668082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ADD "isVideoCall" boolean`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "isAudioCall" boolean`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "callDuration" integer`);
        await queryRunner.query(`CREATE TYPE "public"."messages_callstatus_enum" AS ENUM('rejected', 'missed', 'accepted')`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "callStatus" "public"."messages_callstatus_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "callStatus"`);
        await queryRunner.query(`DROP TYPE "public"."messages_callstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "callDuration"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "isAudioCall"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "isVideoCall"`);
    }

}
