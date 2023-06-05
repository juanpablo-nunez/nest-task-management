import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/persistance/user.entity';
import { Repository, Column } from 'typeorm';
import { UserDto } from '../../dto/user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity, 'postgres')
    private userRepository: Repository<UserEntity>,
  ) {}
  async createUser(userDto: UserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    userDto.password = hashedPassword;
    const user = this.userRepository.create(userDto);
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists!');
      }
      throw new InternalServerErrorException();
    }
  }
  async loginUser(userDto: UserDto): Promise<string> {
    const { username, password } = userDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'Success';
    }
    throw new UnauthorizedException('Please check your credentials');
  }
}
