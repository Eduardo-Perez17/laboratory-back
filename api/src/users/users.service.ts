// CONFIG NESTJS AND TYPEORM
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// ENTITIES
import { UsersEntity } from './entities/user.entity';

// DTO'S
import { CreateUserDTO } from './DTO/createUser.dto';

// UTILS
import { ErrorManager } from '../utils';

// FUNCTIONS
import { encryptedPassword } from '../functions';
import { PublicAccess } from '../decorators';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async getAllUsers() {
    try {
      const users: UsersEntity[] = await this.userRepository.find();

      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No results were found',
        });
      }

      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @PublicAccess()
  async createUser(newUser: CreateUserDTO) {
    try {
      if (!newUser) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Bad customer request',
        });
      }

      // We encrypt the user's password
      const passwordEcrypted = await encryptedPassword({
        password: newUser.password,
      });
      newUser.password = passwordEcrypted;

      const userSave = await this.userRepository.save(newUser);

      return userSave;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getUserById(id: string) {
    try {
      const user: UsersEntity = await this.userRepository.findOneBy({ id: id });

      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({ key, value }: { key: any; value: any }) {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
