import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { AuthEntity } from 'src/persistance/user.entity';
import { AuthService } from 'src/service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/singup')
  async sigUp(@Body() authCredential: UserDto): Promise<AuthEntity> {
    return this.authService.sigUp(authCredential);
  }
}
