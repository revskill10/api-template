import { Provide, Scope, ScopeEnum, Autoload, Config } from '@midwayjs/core';
import { ProducerRecord } from 'kafkajs';
import { Kafka, Producer } from 'kafkajs';

@Autoload()
@Provide()
@Scope(ScopeEnum.Singleton) // Singleton singleton, globally unique (process level)
export class KafkaService {
  @Config('kafka')
  kafkaConfig: any;

  private producer: Producer;

  async connect() {
    // To create a connection, you can put the configuration in Config and inject it into it.
    const {
      brokers,
      clientId,
      producerConfig = {},
      ssl,
      sasl,
    } = this.kafkaConfig;
    const client = new Kafka({
      clientId: clientId,
      brokers: brokers,
      ssl,
      sasl,
    });
    this.producer = client.producer(producerConfig);
    await this.producer.connect();
  }

  // Send a message
  public async send(producerRecord: ProducerRecord) {
    await this.connect();
    const result = await this.producer.send(producerRecord);
    await this.producer.disconnect();
    return result;
  }
}
