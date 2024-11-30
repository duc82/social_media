import { MigrationInterface, QueryRunner } from "typeorm";

export class Three1727085906985 implements MigrationInterface {
    name = 'Three1727085906985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_2d69981b419fe03231a32f60956"`);
        await queryRunner.query(`CREATE TABLE "notification_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "likes" boolean NOT NULL DEFAULT true, "comments" boolean NOT NULL DEFAULT true, "friendRequests" boolean NOT NULL DEFAULT true, "birthdays" boolean NOT NULL DEFAULT true, "events" boolean NOT NULL DEFAULT true, "groups" boolean NOT NULL DEFAULT true, "messages" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "REL_5a8ffc3b89343043c9440d631e" UNIQUE ("userId"), CONSTRAINT "PK_d131abd7996c475ef768d4559ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "blockerId" uuid`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "actorId" uuid`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "postId" uuid`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "commentId" uuid`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "REL_2d69981b419fe03231a32f6095"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bfe8ecbabb9001a6a2a2e28a09e" FOREIGN KEY ("blockerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification_settings" ADD CONSTRAINT "FK_5a8ffc3b89343043c9440d631e2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_44412a2d6f162ff4dc1697d0db7" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_93c464aaf70fb0720dc500e93c8" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_2d69981b419fe03231a32f60956" FOREIGN KEY ("friendId") REFERENCES "friends"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_9faba56a12931cf4e38f9dddb49" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9faba56a12931cf4e38f9dddb49"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_2d69981b419fe03231a32f60956"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_93c464aaf70fb0720dc500e93c8"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_44412a2d6f162ff4dc1697d0db7"`);
        await queryRunner.query(`ALTER TABLE "notification_settings" DROP CONSTRAINT "FK_5a8ffc3b89343043c9440d631e2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bfe8ecbabb9001a6a2a2e28a09e"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "REL_2d69981b419fe03231a32f6095" UNIQUE ("friendId")`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "commentId"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "actorId"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "blockerId"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "notification_settings"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_2d69981b419fe03231a32f60956" FOREIGN KEY ("friendId") REFERENCES "friends"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
