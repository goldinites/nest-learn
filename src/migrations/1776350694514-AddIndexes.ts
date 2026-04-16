import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexes1776350694514 implements MigrationInterface {
  name = 'AddIndexes1776350694514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_181b03f16e5ab2a22a19dbc525" ON "book" ("author", "genre", "language", "createdAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_34968765df5f6f3946c2e4573a" ON "review" ("createdAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ae1ec2fd91f77b5df325d1c7b4" ON "review" ("bookId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1337f93918c70837d3cea105d3" ON "review" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1d766710d77d866319a1bc2f76" ON "order_item" ("bookId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_646bf9ece6f45dbe41c203e06e" ON "order_item" ("orderId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7bb07d3c6e225d75d8418380f1" ON "order" ("createdAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7a9573d6a1fb982772a9123320" ON "order" ("status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_caabe91507b3379c7ba73637b8" ON "order" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_228cd21c0af322f67cfc0e8013" ON "cart_item" ("bookId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_29e590514f9941296f3a2440d3" ON "cart_item" ("cartId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_756f53ab9466eb52a52619ee01" ON "cart" ("userId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_756f53ab9466eb52a52619ee01"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_29e590514f9941296f3a2440d3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_228cd21c0af322f67cfc0e8013"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_caabe91507b3379c7ba73637b8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7a9573d6a1fb982772a9123320"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7bb07d3c6e225d75d8418380f1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_646bf9ece6f45dbe41c203e06e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1d766710d77d866319a1bc2f76"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1337f93918c70837d3cea105d3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ae1ec2fd91f77b5df325d1c7b4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_34968765df5f6f3946c2e4573a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_181b03f16e5ab2a22a19dbc525"`,
    );
  }
}
