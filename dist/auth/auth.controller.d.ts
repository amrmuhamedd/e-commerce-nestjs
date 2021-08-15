import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createuser.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
