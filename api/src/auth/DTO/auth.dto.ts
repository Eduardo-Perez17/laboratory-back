// LIBRERIES
import { IsNotEmpty, IsOptional } from 'class-validator';

// INTERFACES
import { AuthBody } from 'api/src/interfaces';

export class AuthDTO implements AuthBody {
  @IsOptional()
  email: string;

  @IsNotEmpty()
  password: string;
}
