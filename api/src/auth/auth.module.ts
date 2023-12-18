import { Global, Module } from '@nestjs/common';

// MODULES
import { UsersModule } from '../users/users.module';

// SERVICES
import { AuthService } from './auth.service';

// CONTROLLERS
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
