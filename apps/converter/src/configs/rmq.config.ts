import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions, IRMQServiceOptions } from 'nestjs-rmq';
import { RMQ_PROTOCOL } from 'nestjs-rmq/dist/constants';

export const getRMQConfig = (): IRMQServiceAsyncOptions => {
  return {
    inject: [ConfigService],
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): IRMQServiceOptions => ({
      exchangeName: configService.get('AMQP_EXCHANGE') ?? '', // ибя обработчика
      connections: [
        {
          login: configService.get('AMQP_LOGIN') ?? '',
          password: configService.get('AMQP_PASSWORD') ?? '',
          port: configService.get('AMQP_PORT') ?? 5672,
          protocol: RMQ_PROTOCOL.AMQP,
          host: configService.get('AMQP_HOSTNAME') ?? '',
        },
      ],
      prefetchCount: 32, //количество сообщений обрабатываемых одновременно
      serviceName: configService.get('SERVICE') ?? 'converter', // для определения какой именно сервис отправил  сообщение
      queueName: configService.get('AMQP_QUEUE'),
      queueArguments: {
        'x-dead-letter-exchange': '',
        'x-dead-letter-routing-key': '_q_dead',
      },
    }),
  };
};
