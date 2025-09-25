import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CallCampaignService } from './call-campaign.service';
import { CreateCallCampaignDto } from './dto/create-call-campaign.dto';
import { UpdateCallCampaignDto } from './dto/update-call-campaign.dto';

@Controller('call-campaign')
export class CallCampaignController {
  constructor(private readonly callCampaignService: CallCampaignService) {}

  @Post()
  create(@Body() createCallCampaignDto: CreateCallCampaignDto) {
    return this.callCampaignService.create(createCallCampaignDto);
  }

  @Get()
  findAll() {
    return this.callCampaignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callCampaignService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCallCampaignDto: UpdateCallCampaignDto) {
    return this.callCampaignService.update(+id, updateCallCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.callCampaignService.remove(+id);
  }
}
