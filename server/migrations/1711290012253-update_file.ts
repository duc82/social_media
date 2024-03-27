import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFile1711290012253 implements MigrationInterface {
    name = 'UpdateFile1711290012253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend_ship" DROP CONSTRAINT "FK_cf78967f6b2ce755e0c58c94b48"`);
        await queryRunner.query(`ALTER TABLE "friend_ship" DROP CONSTRAINT "FK_aaac5ffcdf55b11b95c510c7f1c"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "size"`);
        await queryRunner.query(`ALTER TABLE "friend_ship" ADD CONSTRAINT "FK_cf78967f6b2ce755e0c58c94b48" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_ship" ADD CONSTRAINT "FK_aaac5ffcdf55b11b95c510c7f1c" FOREIGN KEY ("friendId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend_ship" DROP CONSTRAINT "FK_aaac5ffcdf55b11b95c510c7f1c"`);
        await queryRunner.query(`ALTER TABLE "friend_ship" DROP CONSTRAINT "FK_cf78967f6b2ce755e0c58c94b48"`);
        await queryRunner.query(`ALTER TABLE "file" ADD "size" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "friend_ship" ADD CONSTRAINT "FK_aaac5ffcdf55b11b95c510c7f1c" FOREIGN KEY ("friendId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_ship" ADD CONSTRAINT "FK_cf78967f6b2ce755e0c58c94b48" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
