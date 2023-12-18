import { Injectable } from '@nestjs/common';

// SERVICES
import { UsersService } from '../users/users.service';

// LIBRERIES
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from '../users/entities/user.entity';
import { PayloadToken } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public async validateUser(email: string, password: string) {
    const userByEmail = await this.userService.findBy({
      key: 'email',
      value: email,
    });

    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);
      if (match) return userByEmail;
    }

    return null;
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: string | number;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UsersEntity): Promise<any> {
    const getUser = await this.userService.getUserById(user.id);

    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),

      user,
    };
  }
}
