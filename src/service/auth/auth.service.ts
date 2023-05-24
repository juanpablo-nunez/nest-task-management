import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      return this.authRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists!');
      }
      throw new InternalServerErrorException();
    }
  }
}
