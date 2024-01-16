import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./user.entity"

export enum TodoStatus {
    Pending = "Pending",
    Done = "Done"
}

@Entity("Todos")
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column({
        type: 'varchar',
        length: 100
    })
    title: string

    @Column({
        type: 'text',
    })
    description: string

    @Column({
        type: 'enum',
        enum: TodoStatus,
        default: TodoStatus.Pending
    })
    status: TodoStatus

    @Column({
        type: 'varchar',
        length: 100,
    })
    userUuid: string

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

    @ManyToOne(() => User, (user) => user.userTodo)
    @JoinColumn({ name: 'userUuid', referencedColumnName: 'uuid' })
    TodoDetail: User

}
