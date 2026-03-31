import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { User } from '@/modules/user/entities/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/user/dto/update-user.dto';
import { DeleteUserResponse } from '@/modules/user/types/delete-user.type';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { Permissions } from '@/modules/auth/decorators/permissions.decorator';
import { RolesGuard } from '@/modules/auth/guards/roles.guard';
import { Roles } from '@/modules/user/enums/roles.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-by-id/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.findById(id);
  }

  @Get('get-by-email/:email')
  findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.userService.findByEmail(email);
  }

  @Post()
  @Permissions(Roles.ADMIN)
  create(@Body() payload: CreateUserDto): Promise<User> {
    return this.userService.create(payload);
  }

  @Patch(':id')
  @Permissions(Roles.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ): Promise<User | null> {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  @Permissions(Roles.ADMIN)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteUserResponse> {
    return this.userService.delete(id);
  }
}
