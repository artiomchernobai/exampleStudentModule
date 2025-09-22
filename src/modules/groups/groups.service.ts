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

    async getAll() {
        return await this.groupsRepository.getAll();
    }

    async getById(id: number) {
        const group = await this.groupsRepository.getById(id);
        if (!group) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }
        return await this.groupsRepository.getById(id);
    }

    async getStudents(id: number) {
        const group = await this.getById(id);
        if (!group) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }
        return await this.studentsRepository.getByGroup(id);
    }

    async create(createGroupDto: CreateGroupDto) {
        const students = createGroupDto.students || []
        return await this.groupsRepository.create(createGroupDto.id, createGroupDto.name, students);
    }

    async update(id: number, updateGroupDto: UpdateGroupDto) {
        const post = await this.getById(id);
        if (!post) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }
        return await this.groupsRepository.update(id, updateGroupDto);
    }

    async delete(id: number) {
        await this.getById(id);
        return await this.groupsRepository.delete(id);
    }
}