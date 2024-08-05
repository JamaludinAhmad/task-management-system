import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './projects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task])],
  providers: [ProjectsService, TasksService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
