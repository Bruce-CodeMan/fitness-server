import { Controller, Get } from '@nestjs/common';
import { User } from './modules/user/models/user.entity';
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

  @Get('/update')
  async update(): Promise<boolean> {
    return await this.userService.update('8c3c2ba6-7073-4c02-9a80-c5482f82e504',{
      name: 'Bruce超级管理员',
      desc: '管理员',
      tel: '8800888',
      password: '123456',
      account: 'admin',
    })
  }

  @Get('/find')
  async findOne(): Promise<User> {
    return await this.userService.findOne('8c3c2ba6-7073-4c02-9a80-c5482f82e504');
  }
}

