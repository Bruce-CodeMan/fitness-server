/*
 * @Date: 2023-03-31 09:29:48
 * @Author: Bruce
 * @Description: 
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  /**
   * 新增一个用户
   * @param entity 传入一个User的实体
   * @returns Boolean
   */
  async create(entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.insert(entity);
    if(res && res.raw.affectedRows > 0) {
        return true;
    }
    return false;
  }

  /**
   * 删除一个用户
   * @param id 传入一个User 的ID
   * @returns Boolean
   */
  async del(id: string): Promise<boolean> {
      const res = await this.UserRepository.delete(id);
      if(res.affected > 0) {
          return true;
      }
      return false;
  }

  /**
   * 更新一个用户
   * @param id 传入一个User 的ID
   * @param entity 传入一个User 的实体
   * @returns Boolean
   */
  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
      const res = await this.UserRepository.update(id, entity);
      if(res.affected > 0) {
          return true;
      }
      return false;
  }

  /**
   * 查询一个用户
   * @param id 传入一个ID
   * @returns 返回一个User 的实体
   */
  async findOne(id: string): Promise<User> {
      const res = await this.UserRepository.findOne({
          where: {
              id,
          }
      });
      return res;
  }

  /**
   * 通过手机号去查询一个用户
   * @param tel 传入一个手机号
   * @returns 返回一个User 的实体
   */
  async findByTel(tel: string): Promise<User> {
      const res = await this.UserRepository.findOne({
          where: {
              tel,
          }
      });
      return res;
  }

  /**
   * 添加验证码
   * @param id 传入一个User 的ID
   * @param code 传入一个 code
   * @returns Boolean
   */
  async updateCode(id: string, code: string): Promise<boolean> {
      const res = await this.UserRepository.update(id, { code, codeCreatetime: new Date() });
      if(res.affected > 0) {
          return true;
      }else{
          return false;
      }
  }
}
