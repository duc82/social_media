import { MigrationInterface, QueryRunner } from "typeorm";

export class Six1730784747046 implements MigrationInterface {
    name = 'Six1730784747046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."stories_type_enum" RENAME TO "stories_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."stories_type_enum" AS ENUM('image', 'video')`);
        await queryRunner.query(`ALTER TABLE "stories" ALTER COLUMN "type" TYPE "public"."stories_type_enum" USING "type"::"text"::"public"."stories_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."stories_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."stories_type_enum_old" AS ENUM('IMAGE', 'VIDEO')`);
        await queryRunner.query(`ALTER TABLE "stories" ALTER COLUMN "type" TYPE "public"."stories_type_enum_old" USING "type"::"text"::"public"."stories_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."stories_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."stories_type_enum_old" RENAME TO "stories_type_enum"`);
    }

}
