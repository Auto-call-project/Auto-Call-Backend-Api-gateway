// dto/create-excel-file.dto.ts
import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExcelFileDto {
  @ApiProperty({
    description: 'Faylni yuklagan foydalanuvchi ID',
    example: 42,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Serverda saqlanadigan fayl nomi (masalan: uuid.xlsx)',
    example: '3f7e2c5d-9a6b-4c2f-b4b7.xlsx',
  })
  @IsString()
  fileName: string;

  @ApiProperty({
    description: 'Foydalanuvchi yuklagan fayl asl nomi',
    example: 'contacts.xlsx',
  })
  @IsString()
  originalName: string;

  @ApiProperty({
    description: 'Fayl saqlanadigan yo‘l',
    example: '/uploads/excel/3f7e2c5d-9a6b-4c2f-b4b7.xlsx',
  })
  @IsString()
  filePath: string;

  @ApiProperty({
    description: 'Fayl hajmi baytlarda',
    example: 24576,
  })
  @IsInt()
  fileSize: number;

  @ApiProperty({
    description: 'Excel fayldagi jami raqamlar soni',
    example: 120,
  })
  @IsInt()
  totalNumbers: number;
}
