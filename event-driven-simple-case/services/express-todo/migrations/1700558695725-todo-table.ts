import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { TodoStatus } from "../entity/todo.entity"

export class TodoTable1700558695725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Todos",
                columns: [
                    {
                        name: "uuid",
                        type: "varchar",
                        isPrimary: true,
                        length:'100'
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        length: '100'
                    },
                    {
                        name: 'description',
                        type: 'text'
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: [TodoStatus.Pending, TodoStatus.Done],
                    },
                    {
                        name: 'userUuid',
                        type: 'varchar',
                        length: '100'
                    },
                    {
                        name: "CreatedAt",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "UpdatedAt",
                        type: "timestamp",
                        isNullable: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
