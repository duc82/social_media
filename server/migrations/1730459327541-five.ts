import { MigrationInterface, QueryRunner } from "typeorm";

export class Five1730459327541 implements MigrationInterface {
    name = 'Five1730459327541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blocked" DROP CONSTRAINT "FK_340622b9f43a602c8f568381310"`);
        await queryRunner.query(`ALTER TABLE "blocked" DROP CONSTRAINT "FK_39f1744f20e7c883da90e9fd9a3"`);
        await queryRunner.query(`CREATE TYPE "public"."stories_type_enum" AS ENUM('IMAGE', 'VIDEO')`);
        await queryRunner.query(`CREATE TABLE "stories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "type" "public"."stories_type_enum" NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_bb6f880b260ed96c452b32a39f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "isStory"`);
        await queryRunner.query(`ALTER TABLE "blocked" ADD CONSTRAINT "FK_39f1744f20e7c883da90e9fd9a3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blocked" ADD CONSTRAINT "FK_340622b9f43a602c8f568381310" FOREIGN KEY ("blockedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stories" ADD CONSTRAINT "FK_655cd324a6949f46e1b397f621e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stories" DROP CONSTRAINT "FK_655cd324a6949f46e1b397f621e"`);
        await queryRunner.query(`ALTER TABLE "blocked" DROP CONSTRAINT "FK_340622b9f43a602c8f568381310"`);
        await queryRunner.query(`ALTER TABLE "blocked" DROP CONSTRAINT "FK_39f1744f20e7c883da90e9fd9a3"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "isStory" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`DROP TABLE "stories"`);
        await queryRunner.query(`DROP TYPE "public"."stories_type_enum"`);
        await queryRunner.query(`ALTER TABLE "blocked" ADD CONSTRAINT "FK_39f1744f20e7c883da90e9fd9a3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blocked" ADD CONSTRAINT "FK_340622b9f43a602c8f568381310" FOREIGN KEY ("blockedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
