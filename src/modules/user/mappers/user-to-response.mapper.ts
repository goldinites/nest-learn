import { User } from '@/modules/user/entities/user.entity';
import { UserResponse } from '@/modules/user/types/user.type';

export function mapUserToResponse(user: User): UserResponse {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
}

export function mapUsersToResponse(users: User[]): UserResponse[] {
  return users.map(mapUserToResponse);
}
