import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/tasks.entity';
import { User } from './users/users.entity';
import { Project } from './projects/projects.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'task_management_db',
      synchronize: true,
      entities: [User, Project, Task]
    }),
    UsersModule,
    ProjectsModule,
    TasksModule,
    AuthModule,
    ConfigModule.forRoot({isGlobal: true})
  ],
  providers:[AppService],
  controllers: [AppController],
})
export class AppModule {}
