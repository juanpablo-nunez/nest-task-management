import { StatusTypes } from 'src/dto/status-task.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: StatusTypes;
}
