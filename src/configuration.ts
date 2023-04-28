import { Configuration, App, Inject } from '@midwayjs/core';
// import * as koa from '@midwayjs/koa';
import * as express from '@midwayjs/express';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
// import { ReportMiddleware } from './middleware/report.middleware';
import * as swagger from '@midwayjs/swagger';
import * as bull from '@midwayjs/bull';
import * as bullBoard from '@midwayjs/bull-board';
import * as crossDomain from '@midwayjs/cross-domain';
import { APIMatchFilter } from './filter/api.filter';
import { GlobalMatchFilter } from './filter/global.filter';
import { GlobalError } from './filter/default.filter';
import * as codeDye from '@midwayjs/code-dye';
import * as kafka from '@midwayjs/kafka';
import * as cron from '@midwayjs/cron';
import cacheFile from 'express-cache-file';
// import * as basicAuth from 'express-basic-auth';

@Configuration({
  imports: [
    express,
    validate,
    info,
    swagger,
    bull,
    bullBoard,
    crossDomain,
    {
      component: codeDye,
      enabledEnvironment: ['local'], // Enabled locally only
    },
    kafka,
    cron,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: express.Application;

  @Inject()
  bullFramework: bull.Framework;

  async onReady() {
    // add middleware
    // this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
    const root = join(this.app.getBaseDir(), 'public');
    this.app.useMiddleware(
      cacheFile(root, {
        cacheSize: '50mb',
        update: {
          expire: '5 seconds',
          mode: 'cache_first',
        },
      })
    );
    this.app.useMiddleware((req, res, next) => {
      if (req.path === '/api-docs') {
        res.sendFile(`${root}/index.html`);
      } else {
        next();
      }
    });
    this.app.useFilter([APIMatchFilter, GlobalMatchFilter, GlobalError]);

    this.bullFramework.createQueue('test', {
      redis: this.app.getConfig('redis'),
      prefix: '{midway-bull}',
    });
  }

  async onStop(): Promise<void> {}
}
