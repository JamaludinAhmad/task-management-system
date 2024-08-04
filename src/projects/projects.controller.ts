import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProjectDto } from './create-project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(
        private projectService: ProjectsService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllProjectsUser(@Req() req){
        const user = req.user;
        return this.projectService.findAllProjectByUser(user);
    }


    @UseGuards(JwtAuthGuard)
    @Post()
    async createProject(@Req() req, @Body() createProjectDto: CreateProjectDto){
        const user = req.user;
        return this.projectService.createProject(user, createProjectDto);
    }

    @Delete(':id')
    async deleteProject(@Param('id') id: number){
        return this.projectService.deleteProject(id);
    }

    @Put(':id')
    async updateProject(@Param('id') id: number, @Body() createProjectDto: CreateProjectDto){
        return this.projectService.updateProject(createProjectDto, id);
    }
}
