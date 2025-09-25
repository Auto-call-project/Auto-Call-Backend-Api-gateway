import { Injectable } from '@nestjs/common';
import { CreateCallCampaignDto } from './dto/create-call-campaign.dto';
import { UpdateCallCampaignDto } from './dto/update-call-campaign.dto';

@Injectable()
export class CallCampaignService {
  create(createCallCampaignDto: CreateCallCampaignDto) {
    return 'This action adds a new callCampaign';
  }

  findAll() {
    return `This action returns all callCampaign`;
  }

  findOne(id: number) {
    return `This action returns a #${id} callCampaign`;
  }

  update(id: number, updateCallCampaignDto: UpdateCallCampaignDto) {
    return `This action updates a #${id} callCampaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} callCampaign`;
  }
}
