import { Module, forwardRef } from "@nestjs/common";
import { GroupsController } from "./groups.controller";
import { GroupsService } from "./groups.service";
import { GroupsRepository } from "./groups.repository";
import { StudentsModule } from "../students/students.module";
import { StudentsRepository } from "../students/students.repository";

@Module({
    imports: [forwardRef(() => StudentsModule)],
    controllers: [GroupsController],
    providers: [
        GroupsService,
        GroupsRepository,
        StudentsRepository
    ],
    exports: [
        GroupsService,
        GroupsRepository]
})
export class GroupsModule {}