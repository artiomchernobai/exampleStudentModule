import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Group } from "./group.entity";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { StudentsService } from "../students/students.service";

@Injectable()
export class GroupsRepository {

    private groups: Group[];

    constructor(
        @Inject(forwardRef(() => StudentsService))
        private readonly studentsService: StudentsService
    ) {
        this.initialize();
    }

    private initialize() {
        this.groups = [
            { id: 1, name: 'Group 1' },
            { id: 2, name: 'Group 2' },
            { id: 3, name: 'Group 3' },
        ];
    }

    getAll(){
        return this.groups;
    }

    getById(id: number){
        return this.groups.find(group => group.id === id);
    }

    create(id: number, name: string){
        const newGroup = {
            id,
            name
        };
        this.groups.push(newGroup);
        return newGroup;
    }

    update(id: number, updateGroupDto: UpdateGroupDto){
        const groupIndex = this.groups.findIndex(group => group.id === id);
        if(groupIndex === -1){
            return null;
        }
        const updatedGroup = { ...this.groups[groupIndex], ...updateGroupDto };
        this.groups[groupIndex] = updatedGroup;
        return this.groups[groupIndex];
    }

    delete(id: number){
        const groupIndex = this.groups.findIndex(group => group.id === id);
        if(groupIndex === -1){
            return null;
        }
        const deletedGroup = this.groups.splice(groupIndex, 1);
        return deletedGroup[0];
    }
}