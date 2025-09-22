import { Controller, Get, Post, Param, Put, Delete, Patch, Body } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Controller('groups')
export class GroupsController {

    constructor(private groupsService: GroupsService) { }

    @Get()
    // todo rename all methods and remove entity from name 
    async getAll() {
        return await this.groupsService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.groupsService.getById(Number(id));
    }

    @Get(':id/students')
    async getStudents(@Param('id') groupId: string) {
        return await this.groupsService.getStudents(Number(groupId));
    }

    @Post('')
    async create(@Body() createGroupDto: CreateGroupDto) {
        return await this.groupsService.create(createGroupDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
        return await this.groupsService.update(Number(id), updateGroupDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.groupsService.delete(Number(id));
    }
}