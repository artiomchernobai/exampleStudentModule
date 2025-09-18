import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from './modules/students/student.entity';
import { Group } from './modules/groups/group.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'mydb',
    synchronize: true,
    logging: true,
    entities: [Group, Student],
});