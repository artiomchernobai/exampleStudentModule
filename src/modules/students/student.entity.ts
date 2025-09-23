import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from '../groups/group.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  groupId: number;

  @ManyToOne(() => Group, group => group.students, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group?: Group | null;
}
