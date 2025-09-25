import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Foydalanuvchining to‘liq ismi',
    required: false,
  })
  @IsOptional()
  @IsString()
  fullname?: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'Unique foydalanuvchi nomi',
  })
  @IsNotEmpty({ message: 'Username bo‘sh bo‘lishi mumkin emas' })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Unique foydalanuvchi emaili',
  })
  @IsNotEmpty({ message: 'Email bo‘sh bo‘lishi mumkin emas' })
  @IsEmail({}, { message: 'Email formati noto‘g‘ri' })
  email: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Foydalanuvchi telefon raqami',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 'password123',
    description: 'Foydalanuvchi paroli (plain, DBda hash qilinadi)',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'Password bo‘sh bo‘lishi mumkin emas' })
  @IsString()
  @MinLength(6, {
    message: 'Parol uzunligi kamida 6 ta belgidan iborat bo‘lishi kerak',
  })
  password: string;

  @ApiProperty({
    example: [2],
    description: 'Foydalanuvchiga biriktiriladigan role ID lar',
    required: false,
    type: [Number],
  })
  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  roles: number[];
}
