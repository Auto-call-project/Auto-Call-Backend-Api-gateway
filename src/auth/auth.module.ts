import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: 'auth',
          protoPath: join(process.cwd(), 'src/proto/auth.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
