import { MigrationInterface, QueryRunner } from "typeorm";

export class Four1735149178148 implements MigrationInterface {
    name = 'Four1735149178148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."posts_access_enum" RENAME TO "posts_access_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."posts_access_enum" AS ENUM('public', 'friends', 'only me')`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "access" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "access" TYPE "public"."posts_access_enum" USING "access"::"text"::"public"."posts_access_enum"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "access" SET DEFAULT 'public'`);
        await queryRunner.query(`DROP TYPE "public"."posts_access_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."posts_access_enum_old" AS ENUM('Public', 'Friends', 'Only me')`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "access" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "access" TYPE "public"."posts_access_enum_old" USING "access"::"text"::"public"."posts_access_enum_old"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "access" SET DEFAULT 'Public'`);
        await queryRunner.query(`DROP TYPE "public"."posts_access_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."posts_access_enum_old" RENAME TO "posts_access_enum"`);
    }

}
