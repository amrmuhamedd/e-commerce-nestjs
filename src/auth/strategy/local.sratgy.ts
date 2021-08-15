import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Injectable()
export class LocalStartegy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<any> {
    const constextId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleRef.resolve(AuthService, constextId);
    const user = await authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user._doc) {
      throw new NotFoundException();
    }
    return user;
  }
}
