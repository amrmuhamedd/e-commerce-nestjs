import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createuser.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, doc: LoginDto): Promise<{
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
