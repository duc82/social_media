import { MigrationInterface, QueryRunner } from "typeorm";

export class Six1721637047111 implements MigrationInterface {
    name = 'Six1721637047111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "bio" character varying(300)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "bio" character varying`);
    }

}
