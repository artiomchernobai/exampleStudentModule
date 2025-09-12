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
        return this.studentsService.getAll();
    }

    @Get(':id')
    getStudentById(@Param('id') id: string) {
        return this.studentsService.getById(id);
    }

    @Get(':id/groups')
    getGroup(@Param('id') id: string) {
        return this.studentsService.getGroup(id);
    }

    @Post('')
    create(@Body() createStudentDto: CreateStudentDto) {
        return this.studentsService.create(createStudentDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentsService.update(id, updateStudentDto);
    }

    @Patch(':id')
    partiallyUpdate(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentsService.partiallyUpdate(id, updateStudentDto);
    }

    @Patch(':id/update-name')
    updateName(@Param('id') id: string, @Body() updateStudentNameDto: UpdateStudentNameDto) {
        return this.studentsService.updateName(id, updateStudentNameDto.name);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.studentsService.delete(id);
    }
}