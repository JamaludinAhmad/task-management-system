import { Task } from "src/tasks/tasks.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @ManyToMany(() => User, user => user.projects, {cascade: true})
    @JoinTable()
    users: User[]

    @OneToMany(() => Task, task => task.project)
    tasks: Task[];

}