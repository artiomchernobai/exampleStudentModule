import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "./group.entity";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Injectable()
export class GroupsRepository {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async getAll() {
    return await this.groupRepository.find({ relations: ["students"] });
  }

  async getById(id: number) {
    return await this.groupRepository.findOne({
      where: { id },
      relations: ["students"],
    });
  }

  async create(id: number, name: string, students: any[]) {
    const group = this.groupRepository.create({ id, name, students });
    return await this.groupRepository.save(group);
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    return await this.groupRepository.update(id, updateGroupDto);
  }

  async delete(id: number) {
    return await this.groupRepository.delete(id);
  }
}
