import { Injectable, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';
import { CreateProjectDto } from './create-project.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project) private projectRepo : Repository<Project>
    ){}

    async findOne(id: number): Promise<Project>{
        const project = await this.projectRepo.findOne({where: {id}})
        if(!project){
            throw new NotFoundException('Project tidak ditemukan', {cause: new Error(), description: "Not found"});
        }
        return project;
    }

    async findAllProjectByUser(user: User): Promise<Project[]>{
        const projects = await this.projectRepo.find({where: {users: user}})
        if(!projects.length){
            throw new NotFoundException('Project tidak ditemukan', {cause: new Error(), description: "Not found"});
        }

        return projects;
    }

    async createProject(user: User, createProjectDto: CreateProjectDto): Promise<Project>{
        const {name} = createProjectDto;
        const p = this.projectRepo.create({name, users: [user]})
        return this.projectRepo.save(p);
    }

    async deleteProject(id: number){
        const project = await this.findOne(id)
        this.projectRepo.remove(project);
        return 'project deleted succesfully';
    }

    async updateProject(createProjectDto : CreateProjectDto, id: number): Promise<Project | undefined>{
        const project = await this.projectRepo.findOne({where: {id}});
        project.name = createProjectDto.name;

        return this.projectRepo.save(project);

    }
}
