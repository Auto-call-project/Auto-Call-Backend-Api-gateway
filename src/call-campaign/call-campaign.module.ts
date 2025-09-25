import { Module } from '@nestjs/common';
import { CallCampaignService } from './call-campaign.service';
import { CallCampaignController } from './call-campaign.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CAMPAIGN_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: ['callcampaign'],
          protoPath: [
            join(process.cwd(), 'src/proto/call-campaign.proto'),
          ],
        },
      },
    ]),
  ],
  controllers: [CallCampaignController],
  providers: [CallCampaignService],
})
export class CallCampaignModule {}
