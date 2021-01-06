import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createAvariaslancha1607985477212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //criação da minha tabelas do banco de dados
    await queryRunner.createTable(
      new Table({
        name: "avariaslancha",
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
            name: "obs",
            type: "varchar",
          },
        ],
      })
    );

    //fechamento da coluna
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("avariaslancha");
  }
}
