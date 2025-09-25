import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({
    description: 'Role ID for update',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Role name',
    example: 'Admin',
    required: false, 
  })
  name?: string;

  @ApiProperty({
    description: 'Role description',
    example: 'Administrator with full access',
    required: false,
  })
  description?: string;
}
