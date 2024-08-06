import { ForbiddenException, Injectable, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';
import { CreateProjectDto } from './create-project.dto';
import { User } from '../users/users.entity';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project) private projectRepo : Repository<Project>,
        private taskService: TasksService
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

    async deleteProject(id: number): Promise<void>{
        const project = await this.projectRepo.findOne({relations: {tasks: true, users: true}, where : {id}})
        
        if(project.tasks.length > 0){
            project.tasks.forEach((task) => {
                this.taskService.deleteTask(task.id, project);
            })
        }
        await this.projectRepo.remove(project);
    }

    async updateProject(createProjectDto : CreateProjectDto, id: number): Promise<Project | undefined>{
        const project = await this.projectRepo.findOne({where: {id}});
        project.name = createProjectDto.name;

        return this.projectRepo.save(project);

    }

    async checkUserInProject(user: any, id: number): Promise<Project | undefined> {
        const project = (await this.findAllProjectByUser(user));
        let isValid = false;
        project.map((key, value) => {
            console.log(key.id + " " + id);
            
            if(key.id == id) isValid = true;
        });
        if (!isValid) {
          throw new ForbiddenException('You are not authorized to perform this action on this project');
        }
        return null;
    }
}
