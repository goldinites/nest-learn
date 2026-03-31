import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserErrors } from '@/modules/user/enums/errors.enum';
import type { DeleteUserResponse } from '@/modules/user/types/delete-user.type';
import type { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import type { UpdateUserDto } from '@/modules/user/dto/update-user.dto';
import { GetUserReqDto } from '@/modules/user/dto/get-user.dto';
import { getSafeUser } from '@/modules/auth/utils/get-safe-user';
import { SafeUser } from '@/modules/auth/types/register.type';
import { getUserDefaultParams } from '@/modules/user/constants/get-user.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async find(query?: GetUserReqDto): Promise<User[]> {
    const { field, direction, limit, offset, ...where } = {
      ...getUserDefaultParams,
      ...query,
    };

    return await this.userRepository.find({
      where,
      order: { [field]: direction },
      take: limit,
      skip: offset,
    });
  }

  async findOne(params: GetUserReqDto): Promise<User | null> {
    const users: User[] = await this.find(params);

    return users[0] ?? null;
  }

  async create(payload: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create(payload);

    const created: User | null = await this.userRepository.save(user);

    if (!created) throw new BadRequestException(UserErrors.NOT_CREATED);

    return created;
  }

  async update(id: number, payload: UpdateUserDto): Promise<SafeUser | null> {
    await this.find({ id });

    const { affected } = await this.userRepository.update(id, payload);

    if (affected === 0) throw new BadRequestException(UserErrors.NOT_UPDATED);

    const updated: User | null = await this.findOne({ id });

    if (!updated) return null;

    return getSafeUser(updated);
  }

  async delete(id: number): Promise<DeleteUserResponse> {
    await this.find({ id });

    const { affected } = await this.userRepository.delete(id);

    if (affected === 0) throw new BadRequestException(UserErrors.NOT_DELETED);

    return { success: true };
  }
}
