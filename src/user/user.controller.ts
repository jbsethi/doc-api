import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuth } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
export class UserController {
  @Get('me')
  @UseGuards(JwtAuth)
  getMe(@Req() request: Request) {
    return request.user;
  }
}
