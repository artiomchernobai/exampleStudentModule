import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentNameDto } from "./dto/update-student-name.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { StudentsRepository } from "./students.repository";
import { GroupsService } from "../groups/groups.service";

@Injectable()
export class StudentsService {
    constructor(private studentsRepository: StudentsRepository) {}

    getAll() {
        return this.studentsRepository.getAll();
    }
    
    getById(id: string) {
        const student = this.studentsRepository.getById(id);
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return student;
    }

    getGroup(id: string) {
        const student = this.getById(id);
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return this.studentsRepository.getGroup(id);
    }

    create(createStudentDto: CreateStudentDto) {
        return this.studentsRepository.create(createStudentDto.name, createStudentDto.age, createStudentDto.groupId);
    }

    update(id: string, updateStudentDto: CreateStudentDto) {
        const post = this.getById(id);
        if (!post) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return this.studentsRepository.update(id, updateStudentDto);
    }

    partiallyUpdate(id: string, updateStudentNameDto: CreateStudentDto) {
        const student = this.getById(id);
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return this.studentsRepository.update(id, updateStudentNameDto);
    }

    delete(id: string) {
        this.getById(id);
        return this.studentsRepository.delete(id);
    }

    updateName(id: string, name: string) {
        const student = this.getById(id);
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        student.name = name;
        return this.studentsRepository.update(id, student);
    }
}