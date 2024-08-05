import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { ProjectsModule } from '../projects/projects.module';
import { ProjectsService } from '../projects/projects.service';
import { Project } from '../projects/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project]), ProjectsModule],
  providers: [TasksService, ProjectsService],
  controllers: [TasksController]
})
export class TasksModule {}
