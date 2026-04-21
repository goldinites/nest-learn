import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeReviewTextOptional1776766570195 implements MigrationInterface {
  name = 'MakeReviewTextOptional1776766570195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "review" ALTER COLUMN "text" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "review" ALTER COLUMN "text" SET NOT NULL`,
    );
  }
}
