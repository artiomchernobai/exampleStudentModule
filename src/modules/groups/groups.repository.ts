import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Group } from "./group.entity";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class GroupsRepository {

    private groups: Group[] = [];

    constructor(        
        @InjectRepository(Group)
        private groupRepository: Repository<Group>
    ) {}

    async getAll(){
        console.log('Fetching all groups from database...', await this.groupRepository.count());
        return await this.groupRepository.find({relations: ['students']});
    }

    async getById(id: number){
        return await this.groupRepository.findOne({
            where: { id },
            relations: ['students']
        });
    }

    async create(id: number, name: string, students: any[]){
        const group = await this.groupRepository.create({ id, name, students });
        return await this.groupRepository.save(group);
    }

    async update(id: number, updateGroupDto: UpdateGroupDto){
        return await this.groupRepository.update(id, updateGroupDto)
    }

    async delete(id: number){
        return await this.groupRepository.delete(id);
    }
}