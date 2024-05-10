import { MigrationInterface, QueryRunner } from "typeorm";

export class ManyToMany1715324424483 implements MigrationInterface {
    name = 'ManyToMany1715324424483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7d7007a84dafb60f767455b75e9"`);
        await queryRunner.query(`ALTER TABLE "posts_likes_users" DROP CONSTRAINT "FK_af99ecc047b6eefd6b93479fc7f"`);
        await queryRunner.query(`CREATE TABLE "conversations_users_users" ("conversationsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_a63b369afba67e6ef69445136fb" PRIMARY KEY ("conversationsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35bd28a66d1a6e3eefa386815e" ON "conversations_users_users" ("conversationsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc56bf8e5f76472688210e9a99" ON "conversations_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "posts_likes_users" ADD CONSTRAINT "FK_af99ecc047b6eefd6b93479fc7f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "conversations_users_users" ADD CONSTRAINT "FK_35bd28a66d1a6e3eefa386815e8" FOREIGN KEY ("conversationsId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "conversations_users_users" ADD CONSTRAINT "FK_bc56bf8e5f76472688210e9a996" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversations_users_users" DROP CONSTRAINT "FK_bc56bf8e5f76472688210e9a996"`);
        await queryRunner.query(`ALTER TABLE "conversations_users_users" DROP CONSTRAINT "FK_35bd28a66d1a6e3eefa386815e8"`);
        await queryRunner.query(`ALTER TABLE "posts_likes_users" DROP CONSTRAINT "FK_af99ecc047b6eefd6b93479fc7f"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "conversationId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc56bf8e5f76472688210e9a99"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_35bd28a66d1a6e3eefa386815e"`);
        await queryRunner.query(`DROP TABLE "conversations_users_users"`);
        await queryRunner.query(`ALTER TABLE "posts_likes_users" ADD CONSTRAINT "FK_af99ecc047b6eefd6b93479fc7f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7d7007a84dafb60f767455b75e9" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
