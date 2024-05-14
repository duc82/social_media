import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageConversation1715672353582 implements MigrationInterface {
    name = 'ImageConversation1715672353582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversations" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversations" DROP COLUMN "image"`);
    }

}
