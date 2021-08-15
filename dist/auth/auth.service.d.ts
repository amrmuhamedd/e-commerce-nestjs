import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UsersDocumenet } from './model/users';
import { CreateUserDto } from './dto/createuser.dto';
export declare class AuthService {
    private jwtService;
    private userModel;
    constructor(jwtService: JwtService, userModel: Model<UsersDocumenet>);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(createUeserdto: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
