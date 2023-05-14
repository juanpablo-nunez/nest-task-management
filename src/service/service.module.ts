import { Module } from '@nestjs/common';
import { TaskService } from './task/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/persistance/task.entity';
import { AuthService } from './auth/auth.service';
import { AuthEntity } from 'src/persistance/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, AuthEntity], 'postgres')],
  providers: [TaskService, AuthService],
  exports: [TaskService, AuthService],
})
export class ServiceModule {}
