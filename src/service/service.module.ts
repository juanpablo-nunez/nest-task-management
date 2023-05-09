import { Module } from '@nestjs/common';
import { TaskService } from './task/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/persistance/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity], 'postgres')],
  providers: [TaskService],
  exports: [TaskService],
})
export class ServiceModule {}
