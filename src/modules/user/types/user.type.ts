import { Roles } from '@/modules/user/enums/roles.enum';

export type UserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
};
