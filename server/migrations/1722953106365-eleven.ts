import { MigrationInterface, QueryRunner } from "typeorm";

export class Eleven1722953106365 implements MigrationInterface {
    name = 'Eleven1722953106365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_email_users"`);
        await queryRunner.query(`DROP INDEX "public"."idx_username_users"`);
        await queryRunner.query(`CREATE INDEX "idx_message_reads_user_id" ON "message_reads" ("userId") `);
        await queryRunner.query(`CREATE INDEX "idx_message_reads_message_id" ON "message_reads" ("messageId") `);
        await queryRunner.query(`CREATE INDEX "idx_messages_conversation_id" ON "messages" ("conversationId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_users_username" ON "users" ("username") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_users_email" ON "users" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_users_email"`);
        await queryRunner.query(`DROP INDEX "public"."idx_users_username"`);
        await queryRunner.query(`DROP INDEX "public"."idx_messages_conversation_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_message_reads_message_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_message_reads_user_id"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_username_users" ON "users" ("username") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_email_users" ON "users" ("email") `);
    }

}
