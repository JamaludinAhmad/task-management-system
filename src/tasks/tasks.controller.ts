import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { ProjectsService } from '../projects/projects.service';
import { response } from 'express';

@Controller('projects/:projectId/tasks')
export class TasksController {
    constructor(
        private taskService: TasksService,
        private projectService: ProjectsService
    ){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createTask(@Body() createTaskDto: CreateTaskDto, @Param('projectId') id: number, @Req() req: any, @Res() response: any){
        const project = await this.projectService.findOne(id, req.user);
        const task = await this.taskService.createTask(project, createTaskDto);

        return response.status(HttpStatus.CREATED).json({
            status: 201,
            message: 'Task created successfully',
            data: {
                task
            }             
        });
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteTask(@Param('id') id: number, @Param('projectId') projectId: number, @Req() req: any, @Res() response: any){
        const project = await this.projectService.findOne(projectId, req.user);
        const task = await this.taskService.deleteTask(id, project);

        return response.status(HttpStatus.OK).json({
            status: 200,
            message: 'Task deleted successfully',
            data: {
                task
            }             
        });
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllProjectTask(@Param('projectId') projectId: number, @Req() req: any, @Res() response){
        const project = await this.projectService.findOne(projectId, req.user)
        const task = await this.taskService.findAllTask(project);

        return response.status(HttpStatus.OK).json({
            status: 200,
            message: 'Fetch data successfully',
            data: task       
        });
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateTask(@Body() createTaskDto: CreateTaskDto, @Param('projectId') projectId: number, @Req() req, @Res() response: any){
        const project = await this.projectService.findOne(projectId, req.user);
        const task = await this.taskService.updateTask(project, createTaskDto);

        console.log(task);
        
        return response.status(HttpStatus.OK).json({
            status: 200,
            message: 'Task updated successfully',
            data: task          
        });
    }
    
}
