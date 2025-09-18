import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './modules/students/students.module';
import { GroupsModule } from './modules/groups/groups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './modules/groups/group.entity';
import { Student } from './modules/students/student.entity';

@Module({
  imports: [
    StudentsModule,
    GroupsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'mydb',
      entities: [Group, Student],
      synchronize: true, // <-- это создаст таблицы
      logging: true,
    }),
    TypeOrmModule.forFeature([Group, Student]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
