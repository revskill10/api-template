// src/filter/api.filter.ts
import { Match } from '@midwayjs/core';
import { Context, Response } from '@midwayjs/express';

@Match((ctx: Context, res: Response) => {
  return ctx.path === '/api';
})
export class APIMatchFilter {
  match(value, req: Context, res: Response) {
    // ...
    return {
        status: 200,
        data: {
          value
        },
    };
  }
}