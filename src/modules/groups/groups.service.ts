import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { GroupsRepository } from "./groups.repository";
import { create } from "domain";

@Injectable()
export class GroupsService {
    constructor(private groupsRepository: GroupsRepository) {}

    getAllGroups() {
        return this.groupsRepository.getAllGroups();
    }

    getGroupById(id: number) {
        const group = this.groupsRepository.getGroupById(id);
        if (!group) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }
        return group;
    }

    getStudentsByGroup(id: number) {
        const group = this.getGroupById(id);
        if (!group) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }
        return this.groupsRepository.getStudentsByGroup(id);
    }

    createGroup(createGroupDto: CreateGroupDto) {
        return this.groupsRepository.createGroup(createGroupDto.id, createGroupDto.name);
    }

    updateGroup(id: number, updateGroupDto: UpdateGroupDto) {
        const post = this.getGroupById(id);
        if (!post) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }
        return this.groupsRepository.updateGroup(id, updateGroupDto);
    }

    deleteGroup(id: number) {
        this.getGroupById(id);
        return this.groupsRepository.deleteGroup(id);
    }
}