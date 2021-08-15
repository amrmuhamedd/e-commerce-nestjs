"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_1 = require("./model/users");
let AuthService = class AuthService {
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async validateUser(username, pass) {
        const name = await this.userModel.findOne({ username: username }).exec();
        const email = await this.userModel.findOne({ email: username }).exec();
        const user = name || email;
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: "we didn't find this user",
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if (user && isMatch) {
            const { password } = user, result = __rest(user, ["password"]);
            return Object.assign({}, result);
        }
        return null;
    }
    async login(user) {
        if (user) {
            const payload = {
                username: user.username,
                roles: user.roles,
                id: user._id,
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        return null;
    }
    async register(createUeserdto) {
        const username = await this.userModel.findOne({
            username: createUeserdto.username,
        });
        const email = await this.userModel.findOne({
            username: createUeserdto.email,
        });
        if (username || email) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'user already exist with same username or email',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const saltOrRounds = 12;
        const password = createUeserdto.password;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        try {
            const createdUser = new this.userModel({
                username: createUeserdto.username,
                roles: createUeserdto.roles,
                email: createUeserdto.email,
                password: hashedPassword,
            });
            await createdUser.save();
            const tokenPayload = {
                username: createdUser.username,
                roles: createdUser.roles,
                email: createdUser.email,
                id: createdUser._id,
            };
            return {
                access_token: this.jwtService.sign(tokenPayload),
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'some thing went wrong please try again later',
            }, common_1.HttpStatus.CONFLICT);
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_1.InjectModel(users_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map