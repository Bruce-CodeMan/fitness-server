import { Controller, Get } from '@nestjs/common';
import { UserService } from './modules/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/create')
  async create(): Promise<boolean> {
    return await this.userService.create({
      name: '水滴超级管理员',
      desc: '管理员',
      tel: '8800888',
      password: '123456',
      account: 'admin',
    });
  }

  @Get('/del')
  async del(): Promise<boolean> {
    return await this.userService.del('a67715d5-e4d5-4f33-9836-076bdb68b6d5');
  }
}

