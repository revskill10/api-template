import {
  Provide,
  Consumer,
  MSListenerType,
  Inject,
  KafkaListener,
} from '@midwayjs/core';
import { IMidwayKafkaContext } from '@midwayjs/kafka';
import { KafkaMessage } from 'kafkajs';
import * as bull from '@midwayjs/bull';

@Provide()
@Consumer(MSListenerType.KAFKA)
export class ExampleConsumer {
  @Inject()
  ctx: IMidwayKafkaContext;

  @Inject()
  logger;

  @Inject()
  bullFramework: bull.Framework;

  @KafkaListener('test', {
    subscription: {
      fromBeginning: false,
    },
    runConfig: {
      autoCommit: false,
    },
  })
  async gotData(message: KafkaMessage) {
    try {
      this.logger.info(
        'test output =>',
        message.offset + '' + message.key + '' + message.value.toString('utf8')
      );
      const testQueue = this.bullFramework.getQueue('test');
      // Execute this task immediately
      const data = JSON.parse(message.value.toString('utf8'));
      await testQueue?.runJob(data, { attempts: 3 });
    } catch (error) {
      this.logger.info('error', error);
      this.ctx.commitOffsets(message.offset);
    }
  }
}
