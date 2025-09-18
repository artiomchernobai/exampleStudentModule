import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { Student } from "./student.entity";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { GroupsService } from "../groups/groups.service";

@Injectable()
export class StudentsRepository {
    private students: Student[];

    constructor(
        @Inject(forwardRef(() => GroupsService))
        private readonly groupsService: GroupsService
    ) {
        this.initialize();
    }

    private initialize() {
        this.students = [
            { id: '1', name: 'Student 1', age: 20 , groupId: 1, group: null },
            { id: '2', name: 'Student 2', age: 21 , groupId: 2, group: null },
            { id: '3', name: 'Student 3', age: 22 , groupId: 3, group: null },
        ];
    }

    getAll() {
        const groups = this.groupsService.getAll().reduce((acc, group) => {
            acc[group.id] = group.name;
            return acc;
        }, {});

        const fullStudentData = this.students.map(student => {
            return {
                ...student,
                groupName: groups[student.groupId] || null
            };
        });

        return fullStudentData;
    }

    getById(id: string){
        return this.students.find(student => student.id === id);
    }

    getGroup(id: string) {
        const student = this.getById(id);
        if (!student) {
            return null;
        }
        const group = this.groupsService.getById(student.groupId);
        if (!group) {
            return null;
        }
        return group;
    }

    getByGroup(id: number) {
        const group = this.groupsService.getById(id);
        if (!group) {
            return null;
        }
        return this.getAll().filter(student => student.groupId === id);
    }

    create(name: string, age: number, groupId: number){
        const newStudent = {
            id: (this.students.length + 1).toString(),
            name,
            age,
            groupId
        };
        this.students.push(newStudent);
        return newStudent;
    }
    
    update(id: string, updateStudentDto: UpdateStudentDto){
        const studentIndex = this.students.findIndex(student => student.id === id);
        if(studentIndex === -1){
            return null;
        }
        const updatedStudent = { ...this.students[studentIndex], ...updateStudentDto };
        this.students[studentIndex] = updatedStudent;
        return this.students[studentIndex];
    }
    
    delete(id: string){
        const studentIndex = this.students.findIndex(student => student.id === id);
        if(studentIndex === -1){
            return null;
        }
        const deletedStudent = this.students.splice(studentIndex, 1);
        return deletedStudent[0];
    }
}