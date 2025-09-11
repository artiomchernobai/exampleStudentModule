import { Controller, Get, Post, Param, Put, Delete, Patch, Body } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentNameDto } from "./dto/update-student-name.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";

@Controller('students')
export class StudentsController {

    constructor(private studentsService: StudentsService) { }

    @Get()
    getAllStudents() {
        return this.studentsService.getAllStudents();
    }

    @Get(':id')
    getStudentById(@Param('id') id: string) {
        return this.studentsService.getStudentById(id);
    }

    @Get(':id/groups')
    getStudentGroups(@Param('id') id: string) {
        return this.studentsService.getStudentGroups(id);
    }

    @Post('')
    createStudent(@Body() createStudentDto: CreateStudentDto) {
        return this.studentsService.createStudent(createStudentDto);
    }

    @Put(':id')
    updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentsService.updateStudent(id, updateStudentDto);
    }

    @Patch(':id')
    partiallyUpdateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentsService.partiallyUpdateStudent(id, updateStudentDto);
    }

    @Patch(':id/update-name')
    updateStudentName(@Param('id') id: string, @Body() updateStudentNameDto: UpdateStudentNameDto) {
        return this.studentsService.updateStudentName(id, updateStudentNameDto.name);
    }

    @Delete(':id')
    deleteStudent(@Param('id') id: string) {
        return this.studentsService.deleteStudent(id);
    }
}