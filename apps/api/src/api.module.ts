import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RMQModule } from 'nestjs-rmq';
import { path } from 'app-root-path';

import { ApiController } from './api.controller';
import { getRMQConfig } from './configs/rmq.config';
import { FilesService } from './files.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
    RMQModule.forRootAsync(getRMQConfig()),
  ],
  controllers: [ApiController],
  providers: [FilesService],
})
export class ApiModule {}
