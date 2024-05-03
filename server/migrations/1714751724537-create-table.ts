import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1714751724537 implements MigrationInterface {
    name = 'CreateTable1714751724537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."profiles_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."profiles_marialstatus_enum" AS ENUM('single', 'married', 'divorced', 'widowed')`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gender" "public"."profiles_gender_enum", "avatar" character varying NOT NULL, "wallpaper" character varying, "bornAt" date, "marialStatus" "public"."profiles_marialstatus_enum", "job" character varying, "address" character varying, "overview" character varying, "education" character varying, "workplace" character varying, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "postId" uuid, CONSTRAINT "PK_2e99e04b4a1b31de6f833c18ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."post_files_type_enum" AS ENUM('image', 'video')`);
        await queryRunner.query(`CREATE TABLE "post_files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "type" "public"."post_files_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "postId" uuid, CONSTRAINT "PK_3a75ee290763a3bfa3597f05f3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."posts_audience_enum" AS ENUM('public', 'friends', 'private')`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying, "audience" "public"."posts_audience_enum" NOT NULL DEFAULT 'public', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "resetToken" character varying, "resetTokenExpires" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "profileId" uuid, "tokenId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId"), CONSTRAINT "REL_d98a275f8bc6cd986fcbe2eab0" UNIQUE ("tokenId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4b2bf18167e94dce386d714c67" ON "users" ("fullName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TYPE "public"."friendships_status_enum" AS ENUM('pending', 'accepted', 'declined')`);
        await queryRunner.query(`CREATE TABLE "friendships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."friendships_status_enum" NOT NULL DEFAULT 'pending', "userId" uuid, "friendId" uuid, CONSTRAINT "PK_08af97d0be72942681757f07bc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_comments_likes_users" ("postCommentsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_71c55c9a29df29dd6cddc2834fc" PRIMARY KEY ("postCommentsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6acf439eb3d5dc9bb703158969" ON "post_comments_likes_users" ("postCommentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ff45f723c712f747da6777f702" ON "post_comments_likes_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "posts_likes_users" ("postsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_22375725d266ad40d394810d96b" PRIMARY KEY ("postsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ddf35245765d65f6e1a9430fa7" ON "posts_likes_users" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_af99ecc047b6eefd6b93479fc7" ON "posts_likes_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "FK_62817b3571ec31e552a3cae4e1c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "FK_ac65d744abc05279aee0b290857" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_files" ADD CONSTRAINT "FK_a12706e0fd90132ab2ffa9b0b1e" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD CONSTRAINT "FK_721d9e1784e4eb781d7666fa7ab" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD CONSTRAINT "FK_d54199dd09cec12dda4c4a05cd7" FOREIGN KEY ("friendId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_comments_likes_users" ADD CONSTRAINT "FK_6acf439eb3d5dc9bb7031589693" FOREIGN KEY ("postCommentsId") REFERENCES "post_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_comments_likes_users" ADD CONSTRAINT "FK_ff45f723c712f747da6777f7020" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_likes_users" ADD CONSTRAINT "FK_ddf35245765d65f6e1a9430fa70" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_likes_users" ADD CONSTRAINT "FK_af99ecc047b6eefd6b93479fc7f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_likes_users" DROP CONSTRAINT "FK_af99ecc047b6eefd6b93479fc7f"`);
        await queryRunner.query(`ALTER TABLE "posts_likes_users" DROP CONSTRAINT "FK_ddf35245765d65f6e1a9430fa70"`);
        await queryRunner.query(`ALTER TABLE "post_comments_likes_users" DROP CONSTRAINT "FK_ff45f723c712f747da6777f7020"`);
        await queryRunner.query(`ALTER TABLE "post_comments_likes_users" DROP CONSTRAINT "FK_6acf439eb3d5dc9bb7031589693"`);
        await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_d54199dd09cec12dda4c4a05cd7"`);
        await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_721d9e1784e4eb781d7666fa7ab"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "post_files" DROP CONSTRAINT "FK_a12706e0fd90132ab2ffa9b0b1e"`);
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "FK_ac65d744abc05279aee0b290857"`);
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "FK_62817b3571ec31e552a3cae4e1c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af99ecc047b6eefd6b93479fc7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ddf35245765d65f6e1a9430fa7"`);
        await queryRunner.query(`DROP TABLE "posts_likes_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ff45f723c712f747da6777f702"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6acf439eb3d5dc9bb703158969"`);
        await queryRunner.query(`DROP TABLE "post_comments_likes_users"`);
        await queryRunner.query(`DROP TABLE "friendships"`);
        await queryRunner.query(`DROP TYPE "public"."friendships_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4b2bf18167e94dce386d714c67"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TYPE "public"."posts_audience_enum"`);
        await queryRunner.query(`DROP TABLE "post_files"`);
        await queryRunner.query(`DROP TYPE "public"."post_files_type_enum"`);
        await queryRunner.query(`DROP TABLE "post_comments"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TYPE "public"."profiles_marialstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."profiles_gender_enum"`);
    }

}
