import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class UpdateStudentDto {
    @ApiProperty({ example: 'New Student name', description: 'The name of the new student'})
    @IsString()
    name: string;

    @ApiProperty({ example: 20, description: 'The age of the new student' })
    @IsNumber()
    age: number;

    @ApiProperty({ example: 'New Group ID', description: 'The ID of the new group the student belongs to' })
    @IsString()
    groupId: number;
}