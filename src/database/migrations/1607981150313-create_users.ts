import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1607981150313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //criação da minha do master tabelas do banco de dados
    await queryRunner.createTable(
      new Table({
        name: "users",
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
            name: "master",
            type: "boolean",
          },
          {
            name: "employee",
            type: "boolean",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "phone",
            type: "varchar",
          },
          {
            name: "token",
            type: "varchar",
            isNullable: true,
          },
        ],
      })
    );
    //fechamento da coluna
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
