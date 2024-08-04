import { Body, Controller, Get, HttpStatus, Logger, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../auth/dto/users-create.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    private logger = new Logger(UsersController.name);
    constructor(
        private userService : UsersService,
    ){}

    @Get(':id')
    findUserById(@Param('id') id: number){
        return this.userService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getCurrentUser(@Req() req){
        return req.user;
    }

}
