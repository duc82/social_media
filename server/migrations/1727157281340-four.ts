import { MigrationInterface, QueryRunner } from "typeorm";

export class Four1727157281340 implements MigrationInterface {
    name = 'Four1727157281340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bfe8ecbabb9001a6a2a2e28a09e"`);
        await queryRunner.query(`CREATE TABLE "blocked" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "blockedById" uuid, CONSTRAINT "PK_537b196b5b7e6aa56b637963a1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "blockerId"`);
        await queryRunner.query(`ALTER TABLE "blocked" ADD CONSTRAINT "FK_39f1744f20e7c883da90e9fd9a3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blocked" ADD CONSTRAINT "FK_340622b9f43a602c8f568381310" FOREIGN KEY ("blockedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blocked" DROP CONSTRAINT "FK_340622b9f43a602c8f568381310"`);
        await queryRunner.query(`ALTER TABLE "blocked" DROP CONSTRAINT "FK_39f1744f20e7c883da90e9fd9a3"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "blockerId" uuid`);
        await queryRunner.query(`DROP TABLE "blocked"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bfe8ecbabb9001a6a2a2e28a09e" FOREIGN KEY ("blockerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
