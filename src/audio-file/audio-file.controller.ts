import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AudioFileService } from './interface/audio-file.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { AudioUploadInterceptor } from '../common/interseptors/fileUpload';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import * as mm from 'music-metadata';
import { error } from 'console';

@Controller('audio-file')
export class AudioFileController {
  private audioFileService: AudioFileService;

  constructor(@Inject('FILE_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.audioFileService =
      this.client.getService<AudioFileService>('AudioFileService');
  }

  @Post('upload/:userId')
  @UseInterceptors(AudioUploadInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        audio: {
          type: 'string',
          format: 'binary',
          description: 'Yuklanadigan audio fayl (mp3, wav, aac...)',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Audio faylni yuklash' })
  @ApiResponse({
    status: 201,
    description: 'Audio fayl muvaffaqiyatli yuklandi',
  })
  async uploadExcel(
    @UploadedFile() file: any,
    @Param('userId') userId: string,
  ) {
    console.log(file);
    const duration = await this.getDurationSec(file.path);
    const newAudioFile = await lastValueFrom(
      this.audioFileService.Create({
        userId: +userId,
        fileName: file.filename,
        originalName: file.originalname,
        filePath: file.path,
        durationSec: duration ?? 0,
        format: file.mimetype.split('/')[1],
        fileSize: file.size,
      }),
    );

    return newAudioFile;
  }

  @Get()
  @ApiOperation({ summary: 'Barcha Audio fayllarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Audio fayllar muvaffaqiyatli olindi',
  })
  async findAll() {
    const response = await lastValueFrom(this.audioFileService.FindAll({}));
    return response.items;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta Audio faylni olish' })
  @ApiResponse({
    status: 200,
    description: 'Audio fayl muvaffaqiyatli olindi',
  })
  async findOne(@Param('id') id: string) {
    const response = await lastValueFrom(
      this.audioFileService.FindOne({ id: +id }),
    );
    return response;
  }

  @Delete(':id')
  @ApiOperation({ summary: "Bitta Audio faylni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Audio fayl muvaffaqiyatli o'chirildi",
  })
  async remove(@Param('id') id: string) {
    const response = await lastValueFrom(
      this.audioFileService.Remove({ id: +id }),
    );
    return response;
  }

  async getDurationSec(filePath: string) {
    const metadata = await mm.parseFile(filePath);
    return metadata.format.duration;
  }
}
