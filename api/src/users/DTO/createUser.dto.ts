// VALIDATION DECORATORS
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  Length,
} from 'class-validator';

// CONSTANTS
import { ROLES } from 'api/src/constants';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  readonly firstname: string;

  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @Length(6, 20)
  @IsOptional()
  @IsString()
  password: string;

  @IsEnum(ROLES)
  readonly role: ROLES;
}
