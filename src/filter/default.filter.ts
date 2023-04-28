import { Catch } from '@midwayjs/core';
import { Context, Response } from '@midwayjs/express';

@Catch()
export class GlobalError {
  catch(err: Error & { status: number }, req: Context, res: Response) {
    if (err) {
      return {
        status: err.status ?? 500,
        message: err.message
      }
    }
  }
}