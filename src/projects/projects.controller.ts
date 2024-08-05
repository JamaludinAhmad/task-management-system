import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProjectDto } from './create-project.dto';
import { response } from 'express';

@Controller('projects')
export class ProjectsController {
    constructor(
        private projectService: ProjectsService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllProjectsUser(@Req() req: any, @Res() response: any){
        const user = req.user;
        const project = this.projectService.findAllProjectByUser(user);

        return response.status(HttpStatus.OK).json({
            statusCode: 200,
            message: 'Fetch data successfully',
            data: project          
        });
    }


    @UseGuards(JwtAuthGuard)
    @Post()
    async createProject(@Req() req: any, @Body() createProjectDto: CreateProjectDto, @Res() response: any){
        const user = req.user;
        const project = this.projectService.createProject(user, createProjectDto);

        return response.status(HttpStatus.CREATED).json({
            statusCode: 201,
            message: 'Project created successfully',
            data: {
                project
            }             
        });
    }

    @Delete(':id')
    async deleteProject(@Param('id') id: number){
        this.projectService.deleteProject(id);
        return response.status(HttpStatus.OK).json({
            statusCode: 200,
            message: 'Project deleted successfully',
            data: {}          
        });
    }

    @Put(':id')
    async updateProject(@Param('id') id: number, @Body() createProjectDto: CreateProjectDto){
        const project = this.projectService.updateProject(createProjectDto, id);

        return response.status(HttpStatus.OK).json({
            statusCode: 200,
            message: 'Project updated successfully',
            data: {
                project
            }             
        });
    }
}
