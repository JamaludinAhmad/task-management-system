import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from '../src/projects/projects.controller';
import { Project } from '../src/projects/projects.entity';
import { ProjectsService } from '../src/projects/projects.service';
import { Task } from '../src/tasks/tasks.entity';
import { TasksService } from '../src/tasks/tasks.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ProjectController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let projectId: number;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Project, Task]), AppModule],
      providers: [TasksService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    //login for create token
    token = (
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'ahmad123', password: 'tes123123' })
    ).body.access_token;
  });

  it('/projects (POST)', async () => {
    return request(app.getHttpServer())
      .post('/projects')
      .set(`Authorization`, `Bearer ${token}`)
      .send({ name: 'bismillah berhasil' })
      .expect(201)
      .then((response) => {
        expect(response.body.data.name).toBe('bismillah berhasil');
        expect(response.body.data.id).toBeDefined();
        projectId = response.body.data.id;
      });
  });

  it('it should return response with specific id', async () => {
    return request(app.getHttpServer())
      .get(`/projects/${projectId}`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toBeDefined();
        expect(response.body.data.id).toEqual(projectId);
      });
  });

  it('/projects (GET)', async () => {
    return request(app.getHttpServer())
      .get('/projects')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toBeDefined();
      });
  });

  it('/projects/:projectId (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete(`/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('Project deleted successfully');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
