import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { ProjectsModule } from '../projects/projects.module';
import { ProjectsService } from '../projects/projects.service';
import { Project } from '../projects/projects.entity';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project, User]), ProjectsModule],
  providers: [TasksService, ProjectsService, UsersService],
  controllers: [TasksController]
})
export class TasksModule {}
