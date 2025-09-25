import { Module } from '@nestjs/common';
import { CallsController } from './calls.controller';
import { CallsService } from './interface/calls.interface';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CALLS_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: 'calls',
          protoPath: join(process.cwd(), 'src/proto/calls.proto'),
        },
      },
    ]),
  ],
  controllers: [CallsController],
})
export class CallsModule {}
