import { Body, Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserCOntroller {
  constructor(private authService: UserService) {}

  @Get()
  login() {
    return this.authService.findAll();
  }
}
