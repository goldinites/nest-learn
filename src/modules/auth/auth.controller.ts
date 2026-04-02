import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { SignInDto } from '@/modules/auth/dto/sign-in.dto';
import { RegisterDto } from '@/modules/auth/dto/register.dto';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import type { AuthUser } from '@/modules/auth/types/auth-user.type';
import { UserResponse } from '@/modules/user/types/user.type';
import { SignInResponse } from '@/modules/auth/types/sign-in.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() payload: RegisterDto): Promise<UserResponse> {
    return await this.authService.register(payload);
  }

  @Post('login')
  async signIn(@Body() payload: SignInDto): Promise<SignInResponse> {
    return await this.authService.signIn(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser() { userId }: AuthUser): Promise<UserResponse> {
    return await this.authService.me(userId);
  }
}
