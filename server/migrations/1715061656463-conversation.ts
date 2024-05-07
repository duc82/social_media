import { MigrationInterface, QueryRunner } from "typeorm";

export class Conversation1715061656463 implements MigrationInterface {
    name = 'Conversation1715061656463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."message_files_type_enum" AS ENUM('image', 'video')`);
        await queryRunner.query(`CREATE TABLE "message_files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "type" "public"."message_files_type_enum" NOT NULL, "messageId" uuid, CONSTRAINT "PK_0c383dd49eca61f122709fb16d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversation_messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "seen" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "conversationId" uuid, "userId" uuid, CONSTRAINT "PK_113248f25c4c0a7c179b3f5a609" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isGroup" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "isStory" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "conversationId" uuid`);
        await queryRunner.query(`ALTER TABLE "message_files" ADD CONSTRAINT "FK_d06fa80e981c0fdf8c2b19c320f" FOREIGN KEY ("messageId") REFERENCES "conversation_messages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_messages" ADD CONSTRAINT "FK_f5045a77718bdb593f309a1e258" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_messages" ADD CONSTRAINT "FK_3a46283d969e7cb41a4da1a0cf5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7d7007a84dafb60f767455b75e9" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7d7007a84dafb60f767455b75e9"`);
        await queryRunner.query(`ALTER TABLE "conversation_messages" DROP CONSTRAINT "FK_3a46283d969e7cb41a4da1a0cf5"`);
        await queryRunner.query(`ALTER TABLE "conversation_messages" DROP CONSTRAINT "FK_f5045a77718bdb593f309a1e258"`);
        await queryRunner.query(`ALTER TABLE "message_files" DROP CONSTRAINT "FK_d06fa80e981c0fdf8c2b19c320f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "isStory"`);
        await queryRunner.query(`DROP TABLE "conversations"`);
        await queryRunner.query(`DROP TABLE "conversation_messages"`);
        await queryRunner.query(`DROP TABLE "message_files"`);
        await queryRunner.query(`DROP TYPE "public"."message_files_type_enum"`);
    }

}
