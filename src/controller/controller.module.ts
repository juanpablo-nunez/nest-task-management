import { Module } from '@nestjs/common';
import { TaskController } from './task/task.controller';
import { ServiceModule } from 'src/service/service.module';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [ServiceModule, CreateTaskDto],
  controllers: [TaskController, AuthController],
  exports: [],
})
export class ControllerModule {}
