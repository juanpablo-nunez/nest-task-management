import { Module } from '@nestjs/common';
import { TaskService } from './task/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/persistance/task.entity';
import { UserService } from './user/user.service';
import { UserEntity } from 'src/persistance/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topScrete51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([TaskEntity, UserEntity], 'postgres'),
  ],
  providers: [TaskService, UserService],
  exports: [TaskService, UserService],
})
export class ServiceModule {}
