// CONFIG NEST AND TYPEORM
import { Column, Entity } from 'typeorm';

// LIBRERIES
import { Exclude } from 'class-transformer';

// CONFIG INTERFACES AND ENTITIES
import { BaseEntity } from '../../config';
import { IUser } from 'api/src/interfaces/user.interface';
import { ROLES } from '../../constants';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @Column('varchar', { length: 10, default: '' })
  firstname: string;

  @Column('varchar', { length: 10, default: '' })
  lastname: string;

  @Column({ unique: true, default: null })
  email: string;

  @Exclude()
  @Column({ default: null })
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: string;
}
