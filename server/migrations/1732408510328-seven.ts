import { MigrationInterface, QueryRunner } from "typeorm";

export class Seven1732408510328 implements MigrationInterface {
    name = 'Seven1732408510328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversations" DROP COLUMN "image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversations" ADD "image" character varying`);
    }

}
