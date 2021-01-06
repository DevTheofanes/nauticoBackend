import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCheckETable1609877380203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "checkE",
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
            name: "a",
            type: "boolean",
            default: false,
          },
          {
            name: "b",
            type: "boolean",
            default: false,
          },
          {
            name: "c",
            type: "boolean",
            default: false,
          },
          {
            name: "d",
            type: "boolean",
            default: false,
          },
          {
            name: "e",
            type: "boolean",
            default: false,
          },
          {
            name: "f",
            type: "boolean",
            default: false,
          },
          {
            name: "g",
            type: "boolean",
            default: false,
          },
          {
            name: "h",
            type: "boolean",
            default: false,
          },
          {
            name: "i",
            type: "boolean",
            default: false,
          },
          {
            name: "j",
            type: "boolean",
            default: false,
          },
          {
            name: "k",
            type: "boolean",
            default: false,
          },
          {
            name: "l",
            type: "boolean",
            default: false,
          },
          {
            name: "m",
            type: "boolean",
            default: false,
          },
          {
            name: "n",
            type: "boolean",
            default: false,
          },
          {
            name: "o",
            type: "boolean",
            default: false,
          },
          {
            name: "p",
            type: "boolean",
            default: false,
          },
          {
            name: "q",
            type: "boolean",
            default: false,
          },
          {
            name: "r",
            type: "boolean",
            default: false,
          },
          {
            name: "s",
            type: "boolean",
            default: false,
          },
          {
            name: "t",
            type: "boolean",
            default: false,
          },
          {
            name: "u",
            type: "boolean",
            default: false,
          },
          {
            name: "v",
            type: "boolean",
            default: false,
          },
          {
            name: "aa",
            type: "boolean",
            default: false,
          },
          {
            name: "ab",
            type: "boolean",
            default: false,
          },
          {
            name: "ac",
            type: "boolean",
            default: false,
          },
          {
            name: "ad",
            type: "boolean",
            default: false,
          },
          {
            name: "ae",
            type: "boolean",
            default: false,
          },
          {
            name: "af",
            type: "boolean",
            default: false,
          },
          {
            name: "ag",
            type: "boolean",
            default: false,
          },
          {
            name: "ah",
            type: "boolean",
            default: false,
          },
          {
            name: "ai",
            type: "boolean",
            default: false,
          },
          {
            name: "aj",
            type: "boolean",
            default: false,
          },
          {
            name: "ak",
            type: "boolean",
            default: false,
          },
          {
            name: "al",
            type: "boolean",
            default: false,
          },
          {
            name: "am",
            type: "boolean",
            default: false,
          },
          {
            name: "an",
            type: "boolean",
            default: false,
          },
          {
            name: "ao",
            type: "boolean",
            default: false,
          },
          {
            name: "ap",
            type: "boolean",
            default: false,
          },
          {
            name: "aq",
            type: "boolean",
            default: false,
          },
          {
            name: "ar",
            type: "boolean",
            default: false,
          },
          {
            name: "as",
            type: "boolean",
            default: false,
          },
          {
            name: "at",
            type: "boolean",
            default: false,
          },
          {
            name: "au",
            type: "boolean",
            default: false,
          },
          {
            name: "av",
            type: "boolean",
            default: false,
          },
          {
            name: "aaa",
            type: "boolean",
            default: false,
          },
          {
            name: "aab",
            type: "boolean",
            default: false,
          },
          {
            name: "aac",
            type: "boolean",
            default: false,
          },
          {
            name: "aad",
            type: "boolean",
            default: false,
          },
          {
            name: "aae",
            type: "boolean",
            default: false,
          },
          {
            name: "aaf",
            type: "boolean",
            default: false,
          },
          {
            name: "aag",
            type: "boolean",
            default: false,
          },
          {
            name: "aah",
            type: "boolean",
            default: false,
          },
          {
            name: "aai",
            type: "boolean",
            default: false,
          },
          {
            name: "aaj",
            type: "boolean",
            default: false,
          },
          {
            name: "aak",
            type: "boolean",
            default: false,
          },
          {
            name: "aal",
            type: "boolean",
            default: false,
          },
          {
            name: "aam",
            type: "boolean",
            default: false,
          },
          {
            name: "aan",
            type: "boolean",
            default: false,
          },
          {
            name: "aao",
            type: "boolean",
            default: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("checkE");
  }
}
