import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { Student } from "./student.entity";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { GroupsService } from "../groups/groups.service";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class StudentsRepository {
    private students: Student[];

    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
        @Inject(forwardRef(() => GroupsService))
        private groupsService: GroupsService
    ) {}

    async getAll() {
        return await this.studentRepository.find({relations: ['group']});
    }

    async getById(id: string){
        return await this.studentRepository.findOne({
            where: { id: id },
            relations: ['group']
        });
    }

    async getGroup(id: string) {
        const student = await this.getById(id);
        if (!student) {
            return null;
        }
        return await this.groupsService.getById(student.groupId);
    }

    async getByGroup(id: number) {
        const group = await this.groupsService.getById(id);
        if (!group) {
            return null;
        }
        return (await this.getAll()).filter(student => student.groupId === id);
    }

    async create(name: string, age: number, groupId: number){
        const student = this.studentRepository.create({ name, age, groupId });
        return await this.studentRepository.save(student);
    }
    
    async update(id: string, updateStudentDto: UpdateStudentDto){
        return await this.studentRepository.update(id, updateStudentDto);
    }
    
    delete(id: string){
        return this.studentRepository.delete(id);
    }
}