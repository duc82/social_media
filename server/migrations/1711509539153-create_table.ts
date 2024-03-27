import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1711509539153 implements MigrationInterface {
    name = 'CreateTable1711509539153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."profile_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."profile_marialstatus_enum" AS ENUM('single', 'married', 'divorced', 'widowed')`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gender" "public"."profile_gender_enum", "avatar" character varying NOT NULL, "wallpaper" character varying, "bornAt" date, "marialStatus" "public"."profile_marialstatus_enum", "job" character varying, "address" character varying, "overview" character varying, "location" character varying, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "postId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."file_type_enum" AS ENUM('image', 'video')`);
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "type" "public"."file_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "postId" uuid, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."post_audience_enum" AS ENUM('public', 'friends', 'private')`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying, "audience" "public"."post_audience_enum" NOT NULL DEFAULT 'public', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "resetToken" character varying, "resetTokenExpires" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "profileId" uuid, "tokenId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "REL_63301650f99948e1ff5e0af00b" UNIQUE ("tokenId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_035190f70c9aff0ef331258d28" ON "user" ("fullName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE TYPE "public"."friend_ship_status_enum" AS ENUM('pending', 'accepted', 'declined')`);
        await queryRunner.query(`CREATE TABLE "friend_ship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."friend_ship_status_enum" NOT NULL DEFAULT 'pending', "userId" uuid, "friendId" uuid, CONSTRAINT "PK_3b0abbaa97ebc6ba5d6f80a9fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment_likes_user" ("commentId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_0ccf128d9efb17164fd55b75ef3" PRIMARY KEY ("commentId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b1a1ce2a2776e6850b73de0537" ON "comment_likes_user" ("commentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_03c51abf6cdd2bcf3a9c7b1947" ON "comment_likes_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "post_likes_user" ("postId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_91dfae767678b39354875c2894f" PRIMARY KEY ("postId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_631290356ede4fcbb402128732" ON "post_likes_user" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ec7439ad132e39ffe77fba5fed" ON "post_likes_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_f0f2188b3e254ad31ba2b95ec4b" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_63301650f99948e1ff5e0af00b5" FOREIGN KEY ("tokenId") REFERENCES "token"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_ship" ADD CONSTRAINT "FK_cf78967f6b2ce755e0c58c94b48" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_ship" ADD CONSTRAINT "FK_aaac5ffcdf55b11b95c510c7f1c" FOREIGN KEY ("friendId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_likes_user" ADD CONSTRAINT "FK_b1a1ce2a2776e6850b73de0537c" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comment_likes_user" ADD CONSTRAINT "FK_03c51abf6cdd2bcf3a9c7b19476" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_likes_user" ADD CONSTRAINT "FK_631290356ede4fcbb4021287321" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_likes_user" ADD CONSTRAINT "FK_ec7439ad132e39ffe77fba5fed9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_likes_user" DROP CONSTRAINT "FK_ec7439ad132e39ffe77fba5fed9"`);
        await queryRunner.query(`ALTER TABLE "post_likes_user" DROP CONSTRAINT "FK_631290356ede4fcbb4021287321"`);
        await queryRunner.query(`ALTER TABLE "comment_likes_user" DROP CONSTRAINT "FK_03c51abf6cdd2bcf3a9c7b19476"`);
        await queryRunner.query(`ALTER TABLE "comment_likes_user" DROP CONSTRAINT "FK_b1a1ce2a2776e6850b73de0537c"`);
        await queryRunner.query(`ALTER TABLE "friend_ship" DROP CONSTRAINT "FK_aaac5ffcdf55b11b95c510c7f1c"`);
        await queryRunner.query(`ALTER TABLE "friend_ship" DROP CONSTRAINT "FK_cf78967f6b2ce755e0c58c94b48"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_63301650f99948e1ff5e0af00b5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_f0f2188b3e254ad31ba2b95ec4b"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ec7439ad132e39ffe77fba5fed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_631290356ede4fcbb402128732"`);
        await queryRunner.query(`DROP TABLE "post_likes_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_03c51abf6cdd2bcf3a9c7b1947"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b1a1ce2a2776e6850b73de0537"`);
        await queryRunner.query(`DROP TABLE "comment_likes_user"`);
        await queryRunner.query(`DROP TABLE "friend_ship"`);
        await queryRunner.query(`DROP TYPE "public"."friend_ship_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_035190f70c9aff0ef331258d28"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TYPE "public"."post_audience_enum"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TYPE "public"."file_type_enum"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TYPE "public"."profile_marialstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."profile_gender_enum"`);
    }

}
