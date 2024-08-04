import { Project } from "src/projects/projects.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    
    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @ManyToMany(() => Project, project => project.users)
    projects: Project[];
}