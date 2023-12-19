import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { User } from './entity/User.entity';
import { AuthService } from './services/auth.service';
import { jwtConstants } from 'src/guard/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [AuthService],
})
export class UserModule {}
