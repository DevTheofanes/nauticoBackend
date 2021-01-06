import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class createRevisaojetski1607991198052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         //criação da minha tabelas do banco de dados 
         await queryRunner.createTable(new Table({
            name : 'revisaojetski',
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
                    name: 'lancha',
                    type: 'varchar'
                },
                {
                    name: 'date',
                    type: 'varchar'
                },
                {
                    name: 'hora',
                    type: 'varchar'
                },
                {
                    name: 'responsavel',
                    type: 'varchar'
                },
                {
                    name: 'revisao',
                    type: 'varchar'
                },
                {
                    name: 'tecnico',
                    type: 'varchar'
                },
                
            ]
        }))

        //fechamento da coluna
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('revisaojetski');
    }

}
