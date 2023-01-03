import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions, IRMQServiceOptions, RMQIntercepterClass, Message, RMQPipeClass } from 'nestjs-rmq';

import { RMQ_PROTOCOL } from 'nestjs-rmq/dist/constants';

export class MyIntercepter extends RMQIntercepterClass {
  async intercept(res: any, msg: Message, error: Error): Promise<any> {
    // res - response body
    // msg - initial message we are replying to
    // error - error if exists or null
    return res;
  }
}
class LogMiddleware extends RMQPipeClass {
  async transfrom(msg: Message): Promise<Message> {
    console.log(msg);
    return msg;
  }
}
export const getRMQConfig = (): IRMQServiceAsyncOptions => {
  return {
    inject: [ConfigService],
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): IRMQServiceOptions => {
      return {
        exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
        connections: [
          {
            login: configService.get('AMQP_LOGIN') ?? '',
            password: configService.get('AMQP_PASSWORD') ?? '',
            host: configService.get('AMQP_HOSTNAME') ?? '',
            port: configService.get('AMQP_PORT') ?? 5672,
            protocol: RMQ_PROTOCOL.AMQP,
          },
        ],
        middleware: [LogMiddleware],
        intercepters: [MyIntercepter],
        // logMessages: true,
        prefetchCount: 32,
        serviceName: configService.get('SERVICE') ?? 'api',
      };
    },
  };
};
