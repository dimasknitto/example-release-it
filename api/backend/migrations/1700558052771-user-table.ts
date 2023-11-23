import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { UserGender } from "../entity/user.entity"

export class UserTable1700558052771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Users",
                columns: [
                    {
                        name: "uuid",
                        type: "varchar",
                        isPrimary: true,
                        length:'100'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '50'
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        length: '20'
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '60'
                    },
                    {
                        name: 'gender',
                        type: 'enum',
                        enum: [UserGender.Female, UserGender.Male],
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
        await queryRunner.dropTable("Users")
    }

}
