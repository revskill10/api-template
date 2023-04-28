import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/express';
import { UserService } from '../service/user.service';
import * as bull from '@midwayjs/bull';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  bullFramework: bull.Framework;

  @Get('/get_user')
  async getUser(@Query('uid') uid: number) {
    const user = await this.userService.getUser({ uid });
    const testQueue = this.bullFramework.getQueue('test');
    // Execute this task immediately
    await testQueue?.runJob(1, {});
    return { success: true, message: 'OK', data: user };
  }
}
