import { Module } from "@nestjs/common";
import { StudentsController } from "./students.contoller";
import { StudentsService } from "./students.service";
import { StudentsRepository } from "./students.repository";
import { GroupsModule } from "../groups/groups.module";

@Module({
    imports: [GroupsModule],  
    controllers: [StudentsController],
    providers: [
        StudentsService,
        StudentsRepository
    ],
    exports: [StudentsService]
})
export class StudentsModule {}