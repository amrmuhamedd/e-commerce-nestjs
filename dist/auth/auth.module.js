"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const local_sratgy_1 = require("./strategy/local.sratgy");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constant/constants");
const jwt_stratgy_1 = require("./strategy/jwt.stratgy");
const mongoose_1 = require("@nestjs/mongoose");
const users_1 = require("./model/users");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstats.secret,
                signOptions: { expiresIn: '2d' },
            }),
            mongoose_1.MongooseModule.forFeature([{ name: users_1.User.name, schema: users_1.UserSchema }]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, local_sratgy_1.LocalStartegy, jwt_stratgy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map