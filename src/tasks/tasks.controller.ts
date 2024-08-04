import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { ProjectsService } from 'src/projects/projects.service';

@Controller('projects/:projectId/tasks')
export class TasksController {
    constructor(
        private taskService: TasksService,
        private projectService: ProjectsService
    ){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createTask(@Body() createTaskDto: CreateTaskDto, @Param('projectId') id: number){
        const project = await this.projectService.findOne(id);
        return this.taskService.createTask(project, createTaskDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteTask(@Param('id') id: number, projectId: number){
        const project = await this.projectService.findOne(projectId);
        this.taskService.deleteTask(id, project);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllProjectTask(@Param('projectId') projectId: number){
        const project = await this.projectService.findOne(projectId)
        return this.taskService.findAllTask(project);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateTask(@Body() createTaskDto: CreateTaskDto, @Param('projectId') projectId: number){
        const project = await this.projectService.findOne(projectId);
        return this.taskService.updateTask(project, createTaskDto);
    }
    
}
