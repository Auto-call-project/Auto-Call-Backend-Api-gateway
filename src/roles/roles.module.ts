import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
      ClientsModule.register([
        {
          name: 'USERS_SERVICE',
          transport: Transport.GRPC,
          options: {
            url: '0.0.0.0:50052',
            package: 'roles',
            protoPath: join(process.cwd(), 'src/proto/roles.proto'),
          },
        },
      ]),
    ],
  controllers: [RolesController]
})
export class RolesModule {}
