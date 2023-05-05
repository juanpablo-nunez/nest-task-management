import { Module } from '@nestjs/common';
import { TaskService } from './task/task.service';

@Module({
  providers: [TaskService],
  exports: [TaskService],
})
export class ServiceModule {}
