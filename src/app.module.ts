import { Module } from '@nestjs/common';
import { ServiceModule } from './service/service.module';
import { ControllerModule } from './controller/controller.module';
import { CreateTaskDto } from './dto/create-task.dto';

@Module({
  imports: [ServiceModule, ControllerModule, CreateTaskDto],
  controllers: [],
  providers: [],
})
export class AppModule {}
