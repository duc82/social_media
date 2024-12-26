import { MigrationInterface, QueryRunner } from "typeorm";

export class Three1734597057786 implements MigrationInterface {
    name = 'Three1734597057786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "groupId" uuid`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_d10acbe503da4c56853181efc98" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_d10acbe503da4c56853181efc98"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "groupId"`);
    }

}
