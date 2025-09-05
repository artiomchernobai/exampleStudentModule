import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateStudentDto {
    @ApiProperty({ example: 'Student name', description: 'The name of the student'})
    @IsString()
    name: string;

    @ApiProperty({ example: 20, description: 'The age of the student' })
    @IsNumber()
    age: number;
}