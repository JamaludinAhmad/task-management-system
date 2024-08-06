import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './projects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/tasks.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task, User])],
  providers: [ProjectsService, TasksService, UsersService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
