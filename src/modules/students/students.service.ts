import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentNameDto } from "./dto/update-student-name.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { StudentsRepository } from "./students.repository";
import { GroupsService } from "../groups/groups.service";

@Injectable()
export class StudentsService {
    constructor(private studentsRepository: StudentsRepository) {}

    getAllStudents() {
        return this.studentsRepository.getAllStudents();
    }
    
    getStudentById(id: string) {
        const student = this.studentsRepository.getStudentById(id);
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return student;
    }

    getStudentGroups(id: string) {
        const student = this.getStudentById(id);
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return this.studentsRepository.getStudentGroups(id);
    }

    createStudent(createStudentDto: CreateStudentDto) {
        return this.studentsRepository.createStudent(createStudentDto.name, createStudentDto.age, createStudentDto.groupId);
    }

    updateStudent(id: string, updateStudentDto: CreateStudentDto) {
        const post = this.getStudentById(id);
        if (!post) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return this.studentsRepository.updateStudent(id, updateStudentDto);
    }

    partiallyUpdateStudent(id: string, updateStudentNameDto: CreateStudentDto) {
        const student = this.getStudentById(id);
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return this.studentsRepository.updateStudent(id, updateStudentNameDto);
    }

    deleteStudent(id: string) {
        this.getStudentById(id);
        return this.studentsRepository.deleteStudent(id);
    }

    updateStudentName(id: string, name: string) {
        const student = this.getStudentById(id);
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        student.name = name;
        return this.studentsRepository.updateStudent(id, student);
    }
}