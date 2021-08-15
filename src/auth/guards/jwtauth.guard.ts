import { Injectable , UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // handleRequest<TUser = any>(err: any, user: any): TUser {
        
    //     return {...user , created : 'amr'};
    //   }
}
