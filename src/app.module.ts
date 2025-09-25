import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CallsModule } from './calls/calls.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ExcelFileModule } from './excel-file/excel-file.module';
import { AudioFileModule } from './audio-file/audio-file.module';
import { CallCampaignModule } from './call-campaign/call-campaign.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    CallsModule,
    UsersModule,
    RolesModule,
    AuthModule,
    ExcelFileModule,
    AudioFileModule,
    CallCampaignModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
