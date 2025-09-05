import { Module } from "@nestjs/common";
import { StudentsController } from "./students.contoller";
import { StudentsService } from "./students.service";
import { StudentsRepository } from "./students.repository";

@Module({
    controllers: [StudentsController],
    providers: [
        StudentsService,
        StudentsRepository
    ]
})
export class StudentsModule {}