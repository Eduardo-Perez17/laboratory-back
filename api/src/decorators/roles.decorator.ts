// CONFIG NESTJS AND TYPEORM
import { SetMetadata } from '@nestjs/common';

// CONSTANTS
import { ROLES_KEY } from '../constants/keyDecorator.constants';
import { ROLES } from '../constants';

export const Roles = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(ROLES_KEY, roles);
