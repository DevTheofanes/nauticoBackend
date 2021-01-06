import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSchedulesTable1609788096284 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //criação da minha tabelas do banco de dados
    await queryRunner.createTable(
      new Table({
        name: "schedules",
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
            name: "time",
            type: "timestamp",
          },
          {
            name: "comments",
            type: "varchar",
          },
        ],
      })
    );

    //fechamento da coluna
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("schedules");
  }
}
