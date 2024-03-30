import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProfile1711775779183 implements MigrationInterface {
    name = 'UpdateProfile1711775779183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "education" character varying`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "workplace" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "workplace"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "education"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "location" character varying`);
    }

}
