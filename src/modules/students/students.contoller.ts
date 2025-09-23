import { Controller, Get, Post, Param, Put, Delete, Patch, Body } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentNameDto } from "./dto/update-student-name.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";

@Controller('students')
export class StudentsController {

    constructor(private studentsService: StudentsService) { }

    @Get()
    async getAllStudents() {
        return await this.studentsService.getAll();
    }

    @Get(':id')
    async getStudentById(@Param('id') id: number) {
        return await this.studentsService.getById(id);
    }

    @Get(':id/groups')
    async getGroup(@Param('id') id: number) {
        return await this.studentsService.getGroup(id);
    }

    @Post('')
    async create(@Body() createStudentDto: CreateStudentDto) {
        return await this.studentsService.create(createStudentDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
        return await this.studentsService.update(id, updateStudentDto);
    }

    @Patch(':id')
    async partiallyUpdate(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
        return await this.studentsService.partiallyUpdate(id, updateStudentDto);
    }

    @Patch(':id/update-name')
    async updateName(@Param('id') id: number, @Body() updateStudentNameDto: UpdateStudentNameDto) {
        return await this.studentsService.updateName(id, updateStudentNameDto.name);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.studentsService.delete(id);
    }
}