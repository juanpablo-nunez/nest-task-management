import { Module } from '@nestjs/common';
import { TaskController } from './task/task.controller';
import { ServiceModule } from 'src/service/service.module';
import { CreateTaskDto } from 'src/dto/create-task.dto';

@Module({
  imports: [ServiceModule, CreateTaskDto],
  controllers: [TaskController],
  exports: [],
})
export class ControllerModule {}
