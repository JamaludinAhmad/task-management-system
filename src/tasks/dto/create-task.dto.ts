import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto{
    @IsNotEmpty()
    @IsString()
    name: string;
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    isDone: boolean
}