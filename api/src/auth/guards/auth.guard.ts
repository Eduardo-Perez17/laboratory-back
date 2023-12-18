// CONFIG NESTJS AND TYPEORM
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// EXPRESS
import { Request } from 'express';

// CONSTANTS
import { PUBLIC_KEY } from 'api/src/constants';

// INTERFACES
import { IUseToken } from 'api/src/interfaces';

// SERVICES
import { UsersService } from 'api/src/users/users.service';

// UTILS
import { useToken } from 'api/src/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers['token'];

    if (!token || Array.isArray(token))
      throw new UnauthorizedException('Invalid token');

    const manageToken: IUseToken | string = useToken(token);

    if (typeof manageToken === 'string')
      throw new UnauthorizedException(manageToken);

    if (manageToken.isExpired) throw new UnauthorizedException('Token expired');

    const { sub } = manageToken;
    const user = await this.usersService.getUserById(sub);

    if (!user) throw new UnauthorizedException('Invalid user');

    req.idUser = user.id;
    req.roleUser = user.role;
    return true;
  }
}
