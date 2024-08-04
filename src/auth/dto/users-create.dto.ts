import { IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(21)
    password: string;
}