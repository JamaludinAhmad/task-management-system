import { Injectable, Req, UseGuards } from '@nestjs/common';
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
        return this.projectRepo.findOne({where: {id}})
    }

    async findAllProjectByUser(user: User): Promise<Project[]>{
        return this.projectRepo.find({where: {users: user}})
    }

    async createProject(user: User, createProjectDto: CreateProjectDto): Promise<Project>{
        const {name} = createProjectDto;
        const p = this.projectRepo.create({name, users: [user]})
        return this.projectRepo.save(p);
    }

    async deleteProject(id: number){
        const project = await this.projectRepo.findOne({where: {id}})
        this.projectRepo.remove(project);
        return 'project deleted succesfully';
    }

    async updateProject(createProjectDto : CreateProjectDto, id: number): Promise<Project | undefined>{
        const project = await this.projectRepo.findOne({where: {id}});
        project.name = createProjectDto.name;

        return this.projectRepo.save(project);

    }
}
