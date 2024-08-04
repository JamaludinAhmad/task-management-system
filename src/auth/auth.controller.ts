import { Controller, Post, Res, Body, Logger, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/users-create.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    private logger = new Logger(UsersService.name);
    constructor(
        private authService : AuthService
    ){}

    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const user = await this.authService.validateUser(loginUserDto.username, loginUserDto.password);
        
        if (!user) {
            return 'Invalid credentials';
        }
        return this.authService.login(user);
    }
    
    @Post('register')
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto){
        try {
            const user = await this.authService.register(createUserDto);
            return response.status(HttpStatus.OK).json({
                data: user
            })
        } catch (error) {
            this.logger.log(
                `UserController: createUser : ${JSON.stringify(error.message)}`
            )
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: error.message
            })
        }
    }
    

}
