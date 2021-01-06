import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class createAgendamento1608574874182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

          //criação da minha tabelas do banco de dados 
          await queryRunner.createTable(new Table({
            name : 'agendamento',
            columns: [
               {
                   name: 'id',
                   type: 'integer',
                   unsigned: true,
                   isPrimary: true, 
                   isGenerated: true,
                   generationStrategy: 'increment',
                },
                {
                    name: 'date',
                    type: 'varchar'
                },
                {
                    name: 'hora',
                    type: 'varchar',
                },
                {
                    name: 'obs',
                    type: 'varchar'
                },
            ]
        }))

        //fechamento da coluna
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('agendamento');
    }

}
