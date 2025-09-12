import { Module, forwardRef } from "@nestjs/common";
import { StudentsController } from "./students.contoller";
import { StudentsService } from "./students.service";
import { StudentsRepository } from "./students.repository";
import { GroupsModule } from "../groups/groups.module";
import { GroupsService } from "../groups/groups.service";
import { GroupsRepository } from "../groups/groups.repository";

@Module({
    imports: [forwardRef(() => GroupsModule)],  
    controllers: [StudentsController],
    providers: [
        StudentsService,
        StudentsRepository,
        GroupsService,
        GroupsRepository
    ],
    exports: [
        StudentsService,
        StudentsRepository
    ]
})
export class StudentsModule {}