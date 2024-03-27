import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1711261076058 implements MigrationInterface {
    name = 'Test1711261076058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" ADD "size" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "size"`);
    }

}
