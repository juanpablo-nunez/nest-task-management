import { Module } from '@nestjs/common';
import { TaskController } from './task/task.controller';
import { ServiceModule } from 'src/service/service.module';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { userController } from './user/user.controller';

@Module({
  imports: [ServiceModule, CreateTaskDto],
  controllers: [TaskController, userController],
  exports: [],
})
export class ControllerModule {}
