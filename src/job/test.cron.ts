import { Job, IJob } from '@midwayjs/cron';
import { FORMAT } from '@midwayjs/core';

@Job('testJob', {
  cronTime: FORMAT.CRONTAB.EVERY_PER_30_MINUTE,
  start: false,
})
export class DataSyncCheckerJob implements IJob {
  async onTick() {
    console.log('hello');
  }
}
