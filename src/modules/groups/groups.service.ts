import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { GroupsRepository } from "./groups.repository";
import { StudentsRepository } from "../students/students.repository";

@Injectable()
export class GroupsService {
    constructor(
        private groupsRepository: GroupsRepository,
        @Inject(forwardRef(() => StudentsRepository))
        private studentsRepository: StudentsRepository
    ) {}

    getAll() {
        return this.groupsRepository.getAll();
    }

    getById(id: number) {
        const group = this.groupsRepository.getById(id);
        if (!group) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }
        return this.groupsRepository.getById(id);
    }

    getStudents(id: number) {
        const group = this.getById(id);
        if (!group) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }
        return this.studentsRepository.getByGroup(id);
    }

    create(createGroupDto: CreateGroupDto) {
        return this.groupsRepository.create(createGroupDto.id, createGroupDto.name);
    }

    update(id: number, updateGroupDto: UpdateGroupDto) {
        const post = this.getById(id);
        if (!post) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }
        return this.groupsRepository.update(id, updateGroupDto);
    }

    delete(id: number) {
        this.getById(id);
        return this.groupsRepository.delete(id);
    }
}