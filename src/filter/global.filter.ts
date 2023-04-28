// src/filter/globalMatch.filter.ts
import { Match } from '@midwayjs/core';
// import { Context, Response } from '@midwayjs/express';

@Match()
export class GlobalMatchFilter {
  match(value, req, res) {
    // ...
    return {
      status: 200,
      data: {
        value
      },
    };
  }
}   