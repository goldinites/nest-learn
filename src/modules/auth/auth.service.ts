import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { SignInDto } from '@/modules/auth/dto/sign-in.dto';
import { User } from '@/modules/user/entities/user.entity';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(payload: SignInDto): Promise<string> {
    const user: User = await this.userService.findByEmail(payload.email);

    const hash: string = await argon2.hash(payload.password);
    const isMatch: boolean = await argon2.verify(hash, user?.password ?? '');

    if (!isMatch) throw new UnauthorizedException();

    const tokenPayload = { sub: user.id, email: user.email };

    return await this.jwtService.signAsync(tokenPayload);
  }
}
