// CONFIG NESTJS AND TYPEORM
import { Controller, Post, Body } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';

// SERVICES
import { AuthService } from './auth.service';

// DTO'S
import { AuthDTO } from './DTO/auth.dto';

// DECORATORS
import { PublicAccess } from '../decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicAccess()
  @Post('login')
  async login(@Body() { email, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(email, password);

    if (!userValidate) {
      throw new UnauthorizedException('Data not valid');
    }

    const jwt = await this.authService.generateJWT(userValidate);

    return jwt;
  }
}
