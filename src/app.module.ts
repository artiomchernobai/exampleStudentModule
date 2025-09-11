import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './modules/students/students.module';
import { GroupsModule } from './modules/groups/groups.module';

@Module({
  imports: [StudentsModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
