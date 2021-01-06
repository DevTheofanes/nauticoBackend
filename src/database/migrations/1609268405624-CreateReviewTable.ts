import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReviewTable1609268405624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //criação da minha tabelas do banco de dados
    await queryRunner.createTable(
      new Table({
        name: "reviews",
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
            name: "lastReview",
            type: "timestamp",
          },
          {
            name: "engineHour",
            type: "varchar",
          },
          {
            name: "firm",
            type: "varchar",
          },
          {
            name: "nextReview",
            type: "timestamp",
          },
          {
            name: "expert",
            type: "varchar",
          },
          {
            name: "created",
            type: "timestamp",
          },
        ],
      })
    );

    //fechamento da coluna
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("reviews");
  }
}
