// CONFIG NESTJS AND TYPEORM
import { SetMetadata } from '@nestjs/common';

// CONSTANTS
import { PUBLIC_KEY } from '../constants/keyDecorator.constants';
import { ROLES } from '../constants';

export const AdminAccess = () => SetMetadata(PUBLIC_KEY, ROLES.ADMIN);
