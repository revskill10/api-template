import { MidwayConfig } from '@midwayjs/core';
import swagger from './config.common';
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1678188715414_2957',
  express: {
    port: 7001,
  },
  isDev: true,
  swagger,
  bull: {
    clearRepeatJobWhenStart: false,
    // default queue configuration
    defaultQueueOptions: {
      redis: {
        port: process.env.REDIS_PORT || 8000,
        host: process.env.REDIS_HOST || 'localhost',
        password: process.env.REDIS_PASS || 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
      },
    },
  },
  kafka: {
    kafkaConfig: {
      clientId: 'my-app',
      brokers: ['127.0.0.1:29092'],
    },
    consumerConfig: {
      groupId: 'my-group-id',
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
} as MidwayConfig;
