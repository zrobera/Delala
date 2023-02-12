import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTGuard } from './guard/jwt.guard';
import { JwtStrategy } from './guard/jwt.strategy';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return { secret: 'webassignment' };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JWTGuard, RolesGuard],
})
export class AuthModule {}
