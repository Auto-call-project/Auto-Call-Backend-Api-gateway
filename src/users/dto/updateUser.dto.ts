import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Foydalanuvchining yangi to‘liq ismi',
  })
  @IsOptional()
  @IsString()
  fullname?: string;

  @ApiPropertyOptional({
    example: 'john_doe_new',
    description: 'Yangi foydalanuvchi nomi (unique)',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    example: 'new_john@example.com',
    description: 'Yangi foydalanuvchi emaili (unique)',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email formati noto‘g‘ri' })
  email?: string;

  @ApiPropertyOptional({
    example: '+998901234567',
    description: 'Yangi foydalanuvchi telefon raqami',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: 'newpassword123',
    description: 'Yangi foydalanuvchi paroli (plain, DBda hash qilinadi)',
    minLength: 6,
  })
  @IsOptional()
  @IsString()
  @MinLength(6, {
    message: 'Parol uzunligi kamida 6 ta belgidan iborat bo‘lishi kerak',
  })
  password?: string;

  @ApiPropertyOptional({
    example: [3],
    description: 'Foydalanuvchining yangilanadigan role IDlari',
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  roles?: number[];
}
