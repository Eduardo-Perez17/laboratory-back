// CONFIG TYPEORM AND NEST
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// CONTROLLERS
import { UsersController } from './users.controller';
import { AuthController } from '../auth/auth.controller';

// SERVICES
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

// ENTITIES
import { UsersEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
