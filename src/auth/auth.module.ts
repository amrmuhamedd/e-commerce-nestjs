import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStartegy } from './strategy/local.sratgy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstats } from './constant/constants';
import { JwtStrategy } from './strategy/jwt.stratgy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/users';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstats.secret,
      signOptions: { expiresIn: '2d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStartegy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
