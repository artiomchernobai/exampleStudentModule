import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class UpdateStudentNameDto {
    @ApiProperty({ example: 'New Student name', description: 'New name of the student'})
    @IsString()
    name: string;
}