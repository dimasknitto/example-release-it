import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, UpdateDateColumn } from "typeorm"
import { Todo } from "./todo.entity"

export enum UserGender {
    Male = "Male",
    Female = "Female"
}


@Entity("Users")
export class User {
    @Column({
        type: 'varchar',
        length: 100,
        primary: true
    })
    uuid: string

    @Column({
        type: 'varchar',
        length: 50
    })
    name: string

    @Column({
        type: 'varchar',
        length: 20
    })
    username: string

    @Column({
        type: 'varchar',
        length: 60
    })
    password: string

    @Column({
        type: 'enum',
        enum: UserGender,
        default: UserGender.Male
    })
    gender: UserGender

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @BeforeInsert()
    private beforeInsert(): void {
        // Workaround to solve a bug from 0.2.19 version
        this.CreatedAt = new Date();
    }

    @BeforeUpdate()
    private beforeUpdate(): void {
        // Workaround to solve a bug from 0.2.19 version
        this.UpdatedAt = new Date();
    }

    @OneToMany(() => Todo, (todo) => todo)
    @JoinColumn({ name: 'uuid', referencedColumnName: 'userUuid' })
    userTodo: Todo[]


}
