import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/persistance/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity, 'postgres')
    private authRepository: Repository<AuthEntity>,
  ) {}
  sigUp(userDto: UserDto): Promise<AuthEntity> {
    const user = this.authRepository.create(userDto);
    return this.authRepository.save(user);
  }
}
