// CONFIG NESTJS AND TYPEORM
import { SetMetadata } from '@nestjs/common';

// CONSTANTS
import { ACCESS_LEVEL_KEY } from '../constants/keyDecorator.constants';

export const AccessLevel = (level: number) =>
  SetMetadata(ACCESS_LEVEL_KEY, level);
