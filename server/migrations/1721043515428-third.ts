import { MigrationInterface, QueryRunner } from "typeorm";

export class Third1721043515428 implements MigrationInterface {
    name = 'Third1721043515428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "deleteAt" TO "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "deleteAt" TO "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "groups" RENAME COLUMN "deleteAt" TO "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "messages" RENAME COLUMN "deleteAt" TO "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "conversations" RENAME COLUMN "deleteAt" TO "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "conversation_members" RENAME COLUMN "seen" TO "isRead"`);
        await queryRunner.query(`ALTER TABLE "notifications" RENAME COLUMN "deleteAt" TO "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "banAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bannedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "conversation_members" ALTER COLUMN "isRead" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_members" ALTER COLUMN "isRead" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bannedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleteAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "users" ADD "banAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "notifications" RENAME COLUMN "deletedAt" TO "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "conversation_members" RENAME COLUMN "isRead" TO "seen"`);
        await queryRunner.query(`ALTER TABLE "conversations" RENAME COLUMN "deletedAt" TO "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "messages" RENAME COLUMN "deletedAt" TO "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "groups" RENAME COLUMN "deletedAt" TO "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "deletedAt" TO "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "deletedAt" TO "deleteAt"`);
    }

}
