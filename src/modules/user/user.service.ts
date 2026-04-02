import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserErrors } from '@/modules/user/enums/errors.enum';
import type { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import type { UpdateUserDto } from '@/modules/user/dto/update-user.dto';
import { GetUserReqDto } from '@/modules/user/dto/get-user.dto';
import { getUserDefaultParams } from '@/modules/user/constants/get-user.constants';
import * as argon2 from 'argon2';

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

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async create(payload: CreateUserDto): Promise<User> {
    const hashedPassword: string = await argon2.hash(payload.password);

    const user: User = this.userRepository.create({
      ...payload,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async update(id: number, payload: UpdateUserDto): Promise<User | null> {
    const user: User | null = await this.findById(id);

    if (!user) throw new NotFoundException(UserErrors.NOT_FOUND);

    const { affected } = await this.userRepository.update(id, payload);

    if (affected === 0) throw new BadRequestException(UserErrors.NOT_UPDATED);

    const updated: User | null = await this.findById(id);

    if (!updated) throw new NotFoundException(UserErrors.NOT_FOUND);

    return updated;
  }

  async delete(id: number): Promise<void> {
    const user: User | null = await this.findById(id);

    if (!user) throw new NotFoundException(UserErrors.NOT_FOUND);

    await this.userRepository.remove(user);
  }
}
