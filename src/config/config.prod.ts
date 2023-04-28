import { MidwayConfig } from '@midwayjs/core';
import swagger from './config.common';
import { redis } from './redis.config';
import kafka from './kafka.prod.config';
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1678188715414_2957',
  express: {
    port: 8080,
  },
  isDev: false,
  swagger,
  kafka,
  bull: {
    clearRepeatJobWhenStart: false,
    // default queue configuration
    defaultQueueOptions: {
      redis,
    },
  },
  bullBoard: {
    basePath: '/bull-board',
  },
  bodyParser: {
    json: {
      enable: true,
      limit: '1mb',
      strict: true,
    },
    raw: {
      enable: false,
      limit: '1mb',
    },
    text: {
      enable: true,
      limit: '1mb',
    },
    urlencoded: {
      enable: true,
      extended: false,
      limit: '1mb',
      parameterLimit: 1000,
    },
  },
  codeDye: {
    matchQueryKey: 'codeDyeABC',
  },
  midwayLogger: {
    default: {
      maxSize: '100m',
    },
    clients: {
      coreLogger: {
        enableConsole: true,
        enableFile: false,
        enableError: true,
        enableJSON: true,
      },
      appLogger: {
        enableConsole: true,
        enableFile: false,
        enableError: true,
        enableJSON: true,
      },
    },
  },
} as unknown as MidwayConfig;
