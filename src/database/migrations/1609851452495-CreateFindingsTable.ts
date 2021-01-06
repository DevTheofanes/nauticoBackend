import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFindingsTable1609851452495 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "findings",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "vesselId",
            type: "integer",
          },
          {
            name: "found",
            type: "timestamp",
          },
          {
            name: "comments",
            type: "varchar",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "rg",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "delivered",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("findings");
  }
}
