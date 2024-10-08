import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { Project } from '../projects/projects.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private taskRepo: Repository<Task>
    ){}

    async findOneTaskById(id: number, project: Project): Promise<Task | undefined>{
        return this.taskRepo.findOne({where: {id, project: project}})
    }

    async findAllTask(project: Project): Promise<Task[]>{
        const tasks = await this.taskRepo.find({where: {project}});
        if(tasks == null) throw new NotFoundException('Data tidak ditemukan');

        return tasks;
    }

    async createTask(project: Project, createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepo.create({...createTaskDto, project: project})
        return this.taskRepo.save(task);
    }

    async deleteTask(id: number, project: Project): Promise<any>{
        const task = await this.findOneTaskById(id, project);
        if(task == null) throw new NotFoundException('Data tidak ditemukan');
        return this.taskRepo.remove(task);
    }

    async updateTask(project: Project, createTaskDto: CreateTaskDto): Promise<Task>{
        const task = await this.taskRepo.findOne({where : {project}})
        const {name, description, isDone} = createTaskDto;
        task.isDone = isDone;
        task.name = name;
        task.description = description;
        return this.taskRepo.save(task);
    }
}
