import { MigrationInterface, QueryRunner } from "typeorm";

export class Fourteen1723382109801 implements MigrationInterface {
    name = 'Fourteen1723382109801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."messages_callstatus_enum" RENAME TO "messages_callstatus_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."messages_callstatus_enum" AS ENUM('success', 'failed')`);
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "callStatus" TYPE "public"."messages_callstatus_enum" USING "callStatus"::"text"::"public"."messages_callstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."messages_callstatus_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."messages_callstatus_enum_old" AS ENUM('rejected', 'missed', 'accepted')`);
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "callStatus" TYPE "public"."messages_callstatus_enum_old" USING "callStatus"::"text"::"public"."messages_callstatus_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."messages_callstatus_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."messages_callstatus_enum_old" RENAME TO "messages_callstatus_enum"`);
    }

}
