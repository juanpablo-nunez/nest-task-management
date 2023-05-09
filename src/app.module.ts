import { Module } from '@nestjs/common';
import { ServiceModule } from './service/service.module';
import { ControllerModule } from './controller/controller.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ServiceModule,
    ControllerModule,
    TypeOrmModule.forRoot({
      name: 'postgres',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'task2023',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
