// dto/create-audio-file.dto.ts
import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAudioFileDto {
  @ApiProperty({
    description: 'Audio faylni yuklagan foydalanuvchi ID',
    example: 42,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Serverda saqlanadigan fayl nomi (masalan: uuid.mp3)',
    example: '3f7e2c5d-9a6b-4c2f-b4b7.mp3',
  })
  @IsString()
  fileName: string;

  @ApiProperty({
    description: 'Foydalanuvchi yuklagan audio fayl asl nomi',
    example: 'voice_recording.mp3',
  })
  @IsString()
  originalName: string;

  @ApiProperty({
    description: 'Fayl saqlanadigan yo‘l',
    example: '/uploads/audio/3f7e2c5d-9a6b-4c2f-b4b7.mp3',
  })
  @IsString()
  filePath: string;

  @ApiProperty({
    description: 'Audio fayl davomiyligi soniyalarda',
    example: 125,
  })
  @IsInt()
  durationSec: number;

  @ApiProperty({
    description: 'Audio fayl formati',
    example: 'mp3',
  })
  @IsString()
  format: string;
}
