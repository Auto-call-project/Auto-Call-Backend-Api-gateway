import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({
    example: 'john@exaaaaaaaample.com',
    description: 'foydalanuvchi emaili',
  })
  @IsNotEmpty({ message: 'Email bo‘sh bo‘lishi mumkin emas' })
  @IsEmail({}, { message: 'Email formati noto‘g‘ri' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Foydalanuvchi paroli (plain, DBda hash qilinadi)',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'Password bo‘sh bo‘lishi mumkin emas' })
  @IsString()
  password: string;
}
