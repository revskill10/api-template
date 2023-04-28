import * as fs from 'fs';
import * as path from 'path';
const certFile = fs.readFileSync(path.join(__dirname, 'keys/ca.crt'));
export const redis = {
  port: process.env.REDIS_PORT || 8000,
  host: process.env.REDIS_HOST || 'localhost',
  user: process.env.REDIS_USER,
  password: process.env.REDIS_PASS || 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
  tls: {
    key: certFile,
    cert: certFile,
    ca: certFile,
  },
};
