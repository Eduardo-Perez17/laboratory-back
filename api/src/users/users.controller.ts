// CONFIG NESTJS AND TYPEORM
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';

// SERVICES
import { UsersService } from './users.service';

// DTO'S
import { CreateUserDTO } from './DTO/createUser.dto';

// ENTITIES
import { UsersEntity } from './entities/user.entity';

// DECORATORS
import { Roles } from '../decorators/roles.decorator';

// GUARDIANS
import { RolesGuard } from '../auth/guards/roles.guard';

// CONSTATS
import { ROLES } from '../constants';
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(ROLES.ADMIN)
  @Get()
  async getAllUsers(): Promise<UsersEntity[]> {
    return await this.usersService.getAllUsers();
  }

  @Roles(ROLES.ADMIN)
  @Post()
  async createUser(@Body() newUser: CreateUserDTO): Promise<CreateUserDTO> {
    return await this.usersService.createUser(newUser);
  }

  @Roles(ROLES.ADMIN)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UsersEntity> {
    return await this.usersService.getUserById(id);
  }
}
