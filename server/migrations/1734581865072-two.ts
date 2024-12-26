import { MigrationInterface, QueryRunner } from "typeorm";

export class Two1734581865072 implements MigrationInterface {
    name = 'Two1734581865072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ADD "wallpaper" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "wallpaper"`);
    }

}
