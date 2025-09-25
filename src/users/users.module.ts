import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: 'users',
          protoPath: join(process.cwd(), 'src/proto/users.proto'),
        },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
