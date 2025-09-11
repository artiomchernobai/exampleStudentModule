import { Controller, Get, Post, Param, Put, Delete, Patch, Body } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Controller('groups')
export class GroupsController {

    constructor(private groupsService: GroupsService) { }

    @Get()
    getAllGroups() {
        return this.groupsService.getAllGroups();
    }

    @Get(':id')
    getGroupById(@Param('id') id: string) {
        return this.groupsService.getGroupById(Number(id));
    }

    @Get(':id/students')
    getStudentsByGroupS(@Param('id') id: string) {
        return this.groupsService.getStudentsByGroup(Number(id));
    }

    @Post('')
    createGroup(@Body() createGroupDto: CreateGroupDto) {
        return this.groupsService.createGroup(createGroupDto);
    }

    @Put(':id')
    updateGroup(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
        return this.groupsService.updateGroup(Number(id), updateGroupDto);
    }

    @Delete(':id')
    deleteGroup(@Param('id') id: string) {
        return this.groupsService.deleteGroup(Number(id));
    }
}