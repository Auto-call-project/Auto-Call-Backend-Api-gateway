import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  UsersResponse,
  UsersService,
} from './interface/users.interface';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { lastValueFrom, Observable } from 'rxjs';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { RolesGuard } from '../common/guards/roles-guard';
import { AuthGuard } from '../common/guards/auth-guard';
import { Roles } from '../common/decorators/roles-auth.decorator';

@Controller('users')
export class UsersController {
  private usersService: UsersService;
  constructor(@Inject('USERS_SERVICE') private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.usersService = this.client.getService<UsersService>('UsersService');
  }

  @Post()
  @ApiOperation({ summary: 'Sign Up user to microservice' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() data: CreateUserDto): Observable<UsersResponse> {
    return this.usersService.signUpUsers(data);
  }

  @ApiBearerAuth()
  @Roles('Admin', 'Manager')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get All to microservice' })
  @ApiResponse({ status: 200, description: 'User get all successfully' })
  async findAll() {
    const response = await lastValueFrom(this.usersService.findAllUsers({}));
    return response;
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiOperation({ summary: 'Get one to microservice' })
  @ApiResponse({ status: 200, description: 'User get one successfully' })
  async findOne(@Param('id') id: string) {
    const response = await lastValueFrom(
      this.usersService.findOneUser({ id: +id }),
    );
    return response.user;
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiOperation({ summary: 'Delete one to microservice' })
  @ApiResponse({ status: 200, description: 'User Delete one successfully' })
  async remove(@Param('id') id: string) {
    const response = await lastValueFrom(
      this.usersService.deleteOneUser({ id: +id }),
    );
    return response;
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiOperation({ summary: 'Update User one to microservice' })
  @ApiResponse({ status: 200, description: 'User Updated one successfully', type: UpdateUserDto })
  async update(@Body() data: UpdateUserDto, @Param('id') id: string) {
    console.log();
    const response = await lastValueFrom(
      this.usersService.updateUser({ ...data, id: +id }),
    );
    return response;
  }
}
