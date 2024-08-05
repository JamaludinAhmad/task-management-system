import { Controller, Post, Res, Body, Logger, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/users-create.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { response } from 'express';

@Controller('auth')
export class AuthController {
    private logger = new Logger(UsersService.name);
    constructor(
        private authService : AuthService
    ){}

    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() response) {
        const user = await this.authService.validateUser(loginUserDto.username, loginUserDto.password);
        const {access_token} = await this.authService.login(user);

        return response.status(HttpStatus.OK).json({
            statusCode: 200,
            access_token
        })
    }
    
    @Post('register')
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto){
        const user = await this.authService.register(createUserDto);
        return response.status(HttpStatus.CREATED).json({
            statusCode: 201,
            data: user

        })
    }

}
