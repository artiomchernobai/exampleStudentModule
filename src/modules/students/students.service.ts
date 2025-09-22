import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentNameDto } from "./dto/update-student-name.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { StudentsRepository } from "./students.repository";
import { GroupsService } from "../groups/groups.service";

@Injectable()
export class StudentsService {
    constructor(private studentsRepository: StudentsRepository) {}

    async getAll() {
        return await this.studentsRepository.getAll();
    }
    
    async getById(id: string) {
        const student = await this.studentsRepository.getById(id);
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return student;
    }

    async getGroup(id: string) {
        const student = await this.getById(id);
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return await this.studentsRepository.getGroup(id);
    }

    async create(createStudentDto: CreateStudentDto) {
        return await this.studentsRepository.create(createStudentDto.name, createStudentDto.age, createStudentDto.groupId);
    }

    async update(id: string, updateStudentDto: CreateStudentDto) {
        const post = await this.getById(id);
        if (!post) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return await this.studentsRepository.update(id, updateStudentDto);
    }

    async partiallyUpdate(id: string, updateStudentNameDto: CreateStudentDto) {
        const student = await this.getById(id);
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return await this.studentsRepository.update(id, updateStudentNameDto);
    }

    async delete(id: string) {
        await this.getById(id);
        return await this.studentsRepository.delete(id);
    }

    async updateName(id: string, name: string) {
        const student = await this.getById(id);
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        student.name = name;
        return await this.studentsRepository.update(id, student);
    }
}