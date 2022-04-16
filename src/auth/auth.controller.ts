import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Permission } from 'src/permission/const';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthSignUpDto } from './dto';
import { PermissionGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('register')
  @UseGuards(PermissionGuard(Permission.RegisterUser))
  public register(@Body() body: AuthSignUpDto) {
    return this.service.signUp(body);
  }

  @Post('login')
  public login(@Body() body: AuthLoginDto) {
    return this.service.login(body);
  }
}
