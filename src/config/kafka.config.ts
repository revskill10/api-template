import * as fs from 'fs';
import * as path from 'path';
import * as jks from 'jks-js';

// const ca = fs.readFileSync(path.join(__dirname, 'keys/ca.crt'), 'utf-8');
// const ca = fs.readFileSync(path.join(__dirname, 'keys/ca.crt'));
// const cacert = fs.readFileSync(path.join(__dirname, 'keys/cacert.pem'));
// const cert = fs.readFileSync(path.join(__dirname, 'keys/cert.pem'), 'utf-8');
// const key = fs.readFileSync(path.join(__dirname, 'keys/key.pem'));
// const keyStorePassword = process.env.PASSPHRASE;
const keystore = (jks as any).toPem(
  fs.readFileSync(path.join(__dirname, '/keys/kafka.keystore.jks')),
  'dj25iDXU'
);

const trustore = (jks as any).toPem(
  fs.readFileSync(path.join(__dirname, '/keys/kafka.truststore.jks')),
  'dj25iDXU'
);
const {
  caroot: { ca: ca1 },
} = trustore;
const {
  caroot: { ca },
  localhost: { key, cert },
} = keystore;

const clientId = 'my-app';
const groupId = 'groupId-test';
const brokers = ['kafka-122790-0.cloudclusters.net:19492'];
export const kafka = {
  kafkaConfig: {
    clientId,
    brokers,
    sasl: {
      mechanism: 'scram-sha-256',
      username: process.env.KAFKA_USER,
      password: process.env.KAFKA_PASSWORD,
    },
    ssl: {
      rejectUnauthorized: false,
      ca: [ca, ca1],
      cert,
      key,
      passphrase: 'dj25iDXU',
    },
  },
  consumerConfig: {
    groupId,
  },
};
