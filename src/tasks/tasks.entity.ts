import { Project } from "../projects/projects.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Task{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({default: false})
    isDone : boolean;

    @ManyToOne(() => Project, project => project.tasks)
    project: Project;

}