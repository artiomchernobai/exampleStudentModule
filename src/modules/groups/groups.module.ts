import { Module, forwardRef } from "@nestjs/common";
import { GroupsController } from "./groups.controller";
import { GroupsService } from "./groups.service";
import { GroupsRepository } from "./groups.repository";
import { StudentsModule } from "../students/students.module";
import { StudentsRepository } from "../students/students.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./group.entity";

@Module({
  imports: [forwardRef(() => StudentsModule), TypeOrmModule.forFeature([Group])],
  controllers: [GroupsController],
  providers: [
    GroupsService,
    GroupsRepository
],
  exports: [
    GroupsService,
    GroupsRepository
],
})
export class GroupsModule {}
