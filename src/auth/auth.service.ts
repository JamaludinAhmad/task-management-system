import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/users-create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
      ) {}
    
    async validateUser(username: string, password: string): Promise<User | undefined> {
        const user = await this.userService.findByUsername(username);  
        if (!user) {
            return null;       
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            return user;
        }
        
        return null;
    }
    
    async login(user: User) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto : CreateUserDto){
        const passHash = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = passHash;
        return this.userService.create(createUserDto);
    }
}
