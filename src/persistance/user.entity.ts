import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'user_name' })
  @IsString()
  username: string;

  @Column({ name: 'password' })
  @IsString()
  password: string;
}
