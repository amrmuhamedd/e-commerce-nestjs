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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const creatproduct_dto_1 = require("./products.Dto/creatproduct.dto");
const upadateProduct_dto_1 = require("./products.Dto/upadateProduct.dto");
const jwtauth_guard_1 = require("../auth/guards/jwtauth.guard");
const role_enum_1 = require("../auth/roles/role.enum");
const role_decorator_1 = require("../auth/roles/role.decorator");
const roles_guard_1 = require("../auth/roles/roles.guard");
const swagger_1 = require("@nestjs/swagger");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    findAll() {
        return this.productsService.getAll();
    }
    createProduct(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    getProductbyId(id) {
        return this.productsService.getProductbyId(id);
    }
    getProductsByUserId(id) {
        return this.productsService.getProductsByUserId(id);
    }
    addProductToCarts(id, amount) {
        return this.productsService.addToCart(id, amount);
    }
    getProductsinCart() {
        return this.productsService.getProductsCart();
    }
    removeproductFromCart(id) {
        return this.productsService.deleteProductFromCart(id);
    }
    update(id, UpdateProductDto) {
        return this.productsService.updateProduct(id, UpdateProductDto);
    }
    remove(id) {
        return this.productsService.deleteProduct(id);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(jwtauth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    role_decorator_1.Roles(role_enum_1.Role.Admin),
    swagger_1.ApiBearerAuth(),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [creatproduct_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createProduct", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProductbyId", null);
__decorate([
    common_1.Get('user/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProductsByUserId", null);
__decorate([
    common_1.UseGuards(jwtauth_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Post('cart/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "addProductToCarts", null);
__decorate([
    common_1.UseGuards(jwtauth_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Get('cart/products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProductsinCart", null);
__decorate([
    common_1.UseGuards(jwtauth_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Delete('cart/remove/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "removeproductFromCart", null);
__decorate([
    common_1.UseGuards(jwtauth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    role_decorator_1.Roles(role_enum_1.Role.Admin),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, upadateProduct_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwtauth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    role_decorator_1.Roles(role_enum_1.Role.Admin),
    swagger_1.ApiBearerAuth(),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
ProductsController = __decorate([
    swagger_1.ApiTags('products'),
    common_1.Controller('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map