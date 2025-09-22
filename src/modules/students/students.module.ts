import { Module, forwardRef } from "@nestjs/common";
import { StudentsController } from "./students.contoller";
import { StudentsService } from "./students.service";
import { StudentsRepository } from "./students.repository";
import { GroupsModule } from "../groups/groups.module";
import { GroupsService } from "../groups/groups.service";
import { GroupsRepository } from "../groups/groups.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./student.entity";

@Module({
    imports: [forwardRef(() => GroupsModule), TypeOrmModule.forFeature([Student])],  
    controllers: [StudentsController],
    providers: [
        StudentsService,
        StudentsRepository,
    ],
    exports: [
        StudentsService,
        StudentsRepository
    ]
})
export class StudentsModule {}