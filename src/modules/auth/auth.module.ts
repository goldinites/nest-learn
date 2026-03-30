import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '@/modules/user/user.service';
import { jwtConstants } from '@/modules/auth/constants/auth.constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserService,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
