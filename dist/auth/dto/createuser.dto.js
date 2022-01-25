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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty(),
    class_validator_1.NotContains(' ', { message: "user name shouldn't countain white spaces" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsEmail(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.Length(6, 20),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "roles", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=createuser.dto.js.map