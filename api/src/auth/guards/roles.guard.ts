// CONFIG NEST AND TYPEORM
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

// EXPRESS
import { Request } from 'express';

// CONSTANTS
import { PUBLIC_KEY, ROLES } from 'api/src/constants';
import { ADMIN_KEY, ROLES_KEY } from 'api/src/constants/keyDecorator.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();

    const { roleUser } = req;

    if (roles === undefined) {
      if (admin) {
        return true;
      } else if (admin && roleUser === admin) {
        return true;
      } else {
        throw new UnauthorizedException('You do not have access permissions');
      }
    }

    if (roleUser === ROLES.ADMIN) {
      return true;
    }

    const isAuth = roles.some(role => role === roleUser);

    if (!isAuth) {
      throw new UnauthorizedException('You do not have access permissions');
    }

    return true;
  }
}
