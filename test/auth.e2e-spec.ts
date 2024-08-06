import { Test, TestingModule } from "@nestjs/testing";
import { AuthModule } from "../src/auth/auth.module";
import * as request from 'supertest';
import { UsersModule } from "../src/users/users.module";
import { UsersService } from "../src/users/users.service";
import { TypeORMError } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../src/users/users.entity";
import { AppModule } from "../src/app.module";

describe('AuthController (e2e)', () => {
    let app;
    let token: string;

    beforeAll(async() => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AuthModule,
                UsersModule,
                TypeOrmModule.forFeature([User]),
                UsersModule,
                AppModule],
            providers: [UsersService]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    })

    it('/auth/login (POST)', async () => {
        return request(app.getHttpServer())
        .post('/auth/login')
        .send({username: 'ahmad123', password: 'tes123123'})
        .expect(200)
        .then((response) => {
            expect(response.body.access_token).toBeDefined();
        })
    })

    afterAll(async() => {
        await app.close();
    })
})