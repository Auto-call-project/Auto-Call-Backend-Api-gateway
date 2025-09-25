import { Module } from '@nestjs/common';
import { ExcelFileController } from './excel-file.controller';
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
          package: ['excel_file', 'phone_number'],
          protoPath: [
            join(process.cwd(), 'src/proto/excel-file.proto'),
            join(process.cwd(), 'src/proto/phone-number.proto'),
          ],
        },
      },
    ]),
  ],
  controllers: [ExcelFileController],
})
export class ExcelFileModule {}
