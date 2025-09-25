import { Module } from '@nestjs/common';
import { AudioFileController } from './audio-file.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
          {
            name: 'FILE_SERVICE',
            transport: Transport.GRPC,
            options: {
              url: '0.0.0.0:50053',
              package: ['audio_file'],
              protoPath: [
                join(process.cwd(), 'src/proto/audio-file.proto'),
              ], 
            },
          },
        ]),
  ],
  controllers: [AudioFileController]
})
export class AudioFileModule {}
