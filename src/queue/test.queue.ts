// src/queue/test.queue.ts
import { Processor, IProcessor } from '@midwayjs/bull';
// function sleep(ms) {
// return new Promise(resolve => setTimeout(resolve, ms));
// }
@Processor('test', 50, {
  removeOnComplete: false,
  removeOnFail: false,
})
export class TestProcessor implements IProcessor {
  async execute(params: any) {
    console.log('start params', params);
    // const rndInt = Math.floor(Math.random() * 10000) + 1;
    // await sleep(rndInt);
    // console.log('start params', params);
  }
}
