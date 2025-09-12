import { Controller, Get, Post, Param, Put, Delete, Patch, Body } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Controller('groups')
export class GroupsController {

    constructor(private groupsService: GroupsService) { }

    @Get()
    // todo rename all methods and remove entity from name 
    getAll() {
        return this.groupsService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.groupsService.getById(Number(id));
    }

    @Get(':id/students')
    getStudents(@Param('id') groupId: string) {
        return this.groupsService.getStudents(Number(groupId));
    }

    @Post('')
    create(@Body() createGroupDto: CreateGroupDto) {
        return this.groupsService.create(createGroupDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
        return this.groupsService.update(Number(id), updateGroupDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.groupsService.delete(Number(id));
    }
}