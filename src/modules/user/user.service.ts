import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserErrors } from '@/modules/user/enums/errors.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user: User | null = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException(UserErrors.NOT_FOUND);

    return user;
  }
}
