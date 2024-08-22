import { MigrationInterface, QueryRunner } from "typeorm";

export class Eight1722783389504 implements MigrationInterface {
    name = 'Eight1722783389504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" RENAME COLUMN "marialStatus" TO "maritalStatus"`);
        await queryRunner.query(`ALTER TYPE "public"."profiles_marialstatus_enum" RENAME TO "profiles_maritalstatus_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."profiles_maritalstatus_enum" RENAME TO "profiles_marialstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "profiles" RENAME COLUMN "maritalStatus" TO "marialStatus"`);
    }

}
