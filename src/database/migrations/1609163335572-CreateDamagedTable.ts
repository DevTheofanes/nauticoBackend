import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDamagedTable1609163335572 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //criação da minha tabelas do banco de dados
    await queryRunner.createTable(
      new Table({
        name: "damaged",
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
            name: "comments",
            type: "varchar",
          },
          {
            name: "vesselId",
            type: "integer",
          },
        ],
      })
    );

    //fechamento da coluna
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("damaged");
  }
}
