import { Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { Student } from "./student.entity";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { GroupsService } from "../groups/groups.service";

@Injectable()
export class StudentsRepository {
    private students: Student[];

    constructor(private readonly groupsService: GroupsService) {
        this.initializeStudents();
    }

    private initializeStudents() {
        this.students = [
            { id: '1', name: 'Student 1', age: 20 , groupId: 1},
            { id: '2', name: 'Student 2', age: 21 , groupId: 2},
            { id: '3', name: 'Student 3', age: 22 , groupId: 3},
        ];
    }

    getAllStudents(){
        return this.students;
    }

    getStudentById(id: string){
        return this.students.find(student => student.id === id);
    }

    getStudentGroups(id: string) {
        const student = this.getStudentById(id);
        if (!student) {
            return null;
        }
        return this.groupsService.getGroupById(student.groupId).name
    }

    createStudent(name: string, age: number, groupId: number){
        const newStudent = {
            id: (this.students.length + 1).toString(),
            name,
            age,
            groupId
        };
        this.students.push(newStudent);
        return newStudent;
    }
    
    updateStudent(id: string, updateStudentDto: UpdateStudentDto){
        const studentIndex = this.students.findIndex(student => student.id === id);
        if(studentIndex === -1){
            return null;
        }
        const updatedStudent = { ...this.students[studentIndex], ...updateStudentDto };
        this.students[studentIndex] = updatedStudent;
        return this.students[studentIndex];
    }
    
    deleteStudent(id: string){
        const studentIndex = this.students.findIndex(student => student.id === id);
        if(studentIndex === -1){
            return null;
        }
        const deletedStudent = this.students.splice(studentIndex, 1);
        return deletedStudent[0];
    }
}