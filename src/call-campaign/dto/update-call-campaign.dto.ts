import { PartialType } from '@nestjs/swagger';
import { CreateCallCampaignDto } from './create-call-campaign.dto';

export class UpdateCallCampaignDto extends PartialType(CreateCallCampaignDto) {}
