import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createEmbarcacoeslancha1607984025116
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //criação da minha tabelas do banco de dados
    await queryRunner.createTable(
      new Table({
        name: "embarcacoeslancha",
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
            name: "name",
            type: "varchar",
          },
          {
            name: "proprietario",
            type: "varchar",
          },
          {
            name: "marca",
            type: "varchar",
          },
          {
            name: "modelo",
            type: "varchar",
          },
          {
            name: "ano",
            type: "varchar",
          },
          {
            name: "comprimentototal",
            type: "varchar",
          },
          {
            name: "motor",
            type: "varchar",
          },
          {
            name: "combustivel",
            type: "varchar",
          },
        ],
      })
    );

    //fechamento da coluna
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("embarcacoeslancha");
  }
}
