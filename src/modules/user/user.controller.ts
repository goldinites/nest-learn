import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { User } from '@/modules/user/entities/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/user/dto/update-user.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { Permissions } from '@/modules/auth/decorators/permissions.decorator';
import { RolesGuard } from '@/modules/auth/guards/roles.guard';
import { Roles } from '@/modules/user/enums/roles.enum';
import { GetUserReqDto } from '@/modules/user/dto/get-user.dto';
import { UserResponse } from '@/modules/user/types/user.type';
import {
  mapUsersToResponse,
  mapUserToResponse,
} from '@/modules/user/mappers/user-to-response.mapper';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponse | null> {
    const user: User | null = await this.userService.findById(id);

    if (!user) return null;

    return mapUserToResponse(user);
  }

  @Get()
  async find(@Query() query: GetUserReqDto): Promise<UserResponse[]> {
    const users: User[] = await this.userService.find(query);

    return mapUsersToResponse(users);
  }

  @Post()
  @Permissions(Roles.ADMIN)
  async create(@Body() payload: CreateUserDto): Promise<UserResponse> {
    const user: User = await this.userService.create(payload);

    return mapUserToResponse(user);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ): Promise<UserResponse | null> {
    const user: User | null = await this.userService.update(id, payload);

    if (!user) return null;

    return mapUserToResponse(user);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.userService.delete(id);
  }
}
