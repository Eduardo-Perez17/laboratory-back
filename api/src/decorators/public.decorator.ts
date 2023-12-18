// CONFIG NESTJS AND TYPEORM
import { SetMetadata } from '@nestjs/common';

// CONSTANTS
import { PUBLIC_KEY } from '../constants/keyDecorator.constants';

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);
