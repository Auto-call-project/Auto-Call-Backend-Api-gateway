import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  RolesService,
  Role,
  DeleteResponse,
  RolesList,
} from './interface/roles.interface';
import { Observable } from 'rxjs';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController implements OnModuleInit {
  private rolesService: RolesService;

  constructor(@Inject('USERS_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.rolesService = this.client.getService<RolesService>('RolesService');
  }

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role created successfully' })
  create(@Body() dto: CreateRoleDto): Observable<Role> {
    return this.rolesService.CreateRole(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update role by ID' })
  @ApiResponse({
    status: 200,
    description: 'Role updated successfully',
    type: UpdateRoleDto,
  })
  update(
    @Param('id') id: number,
    @Body() dto: UpdateRoleDto,
  ): Observable<Role> {
    return this.rolesService.UpdateRole({ ...dto, id });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiResponse({ status: 200, description: 'Role found' })
  findOne(@Param('id') id: number): Observable<Role> {
    return this.rolesService.FindOneRole({ id });
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'List of roles' })
  findAll(): Observable<RolesList> {
    return this.rolesService.FindAllRoles({});
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete role by ID' })
  @ApiResponse({ status: 200, description: 'Role deleted successfully' })
  delete(@Param('id') id: number): Observable<DeleteResponse> {
    return this.rolesService.DeleteRole({ id });
  }
}
