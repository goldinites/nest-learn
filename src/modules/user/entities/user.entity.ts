import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '@/modules/user/enums/roles.enum';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 75 })
  firstName: string;

  @Column({ length: 75 })
  lastName: string;

  @Column({ length: 128 })
  email: string;

  @Column({ length: 60 })
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.GHOST })
  role: string;
}
