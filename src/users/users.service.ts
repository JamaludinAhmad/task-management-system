import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/users-create.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo : Repository<User>
    ){}

    async findAll(): Promise<User[]>{
        return this.userRepo.find();
    }

    async create(createUserDto: CreateUserDto): Promise<User>{
        return this.userRepo.save(createUserDto);
    }

    async findById(id: number): Promise<User | undefined>{
        return this.userRepo.findOne({
            where: {
                id
            }
        });
    }

    async findByUsername(username: string): Promise<User | undefined>{
        return this.userRepo.findOne({
            where: {
                username
            }
        });
    }
}
