import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/express';
import { UserService } from '../service/user.service';
import * as bull from '@midwayjs/bull';

@Controller('/api/admin')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  bullFramework: bull.Framework;

  @Get('/create_queue')
  async getUser(@Query('uid') uid: number) {
    const user = await this.userService.getUser({ uid });
    const testQueue = this.bullFramework.getQueue('test');
    // Execute this task immediately
    await testQueue?.runJob(1, { attempts: 3 });
    return { success: true, message: 'OK', data: user };
  }
}
