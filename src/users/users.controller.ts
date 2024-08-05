import { Body, Controller, Get, HttpStatus, Logger, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../auth/dto/users-create.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { response } from 'express';

@Controller('users')
export class UsersController {
    private logger = new Logger(UsersController.name);
    constructor(
        private userService : UsersService,
    ){}

    @Get(':id')
    findUserById(@Param('id') id: number, @Res() response: any){
        const user = this.userService.findById(id);
        return response.status(HttpStatus.OK).json({
            status: 200,
            message: 'success',
            data: user
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getCurrentUser(@Req() req: any, @Res() response: any){        
        const user = req.user;
        return response.status(HttpStatus.OK).json({
            status: 200,
            message: 'success',
            data: user
        })
    }

}
