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
exports.ProductSchema = exports.Products = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const users_1 = require("../../auth/model/users");
let Products = class Products {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Products.prototype, "quantity", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", users_1.User)
], Products.prototype, "seller", void 0);
Products = __decorate([
    mongoose_1.Schema()
], Products);
exports.Products = Products;
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Products);
//# sourceMappingURL=products.js.map