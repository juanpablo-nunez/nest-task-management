import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { UserService } from 'src/service/user/user.service';

@Controller('user')
export class userController {
  constructor(private authService: UserService) {}
  @Post('/signup')
  async signup(@Body() authCredential: UserDto) {
    await this.authService.createUser(authCredential);
  }

  @Post('/signin')
  async signin(@Body() authCredential: UserDto) {
    return await this.authService.loginUser(authCredential);
  }
}
