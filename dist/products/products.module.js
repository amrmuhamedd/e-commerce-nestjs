"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const products_1 = require("./models/products");
const users_1 = require("../auth/model/users");
const cart_1 = require("./models/cart");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: products_1.Products.name, schema: products_1.ProductSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: users_1.User.name, schema: users_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: cart_1.Cart.name, schema: cart_1.CartSchema }]),
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map