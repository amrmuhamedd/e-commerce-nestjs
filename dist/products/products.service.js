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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const mongoose_2 = require("mongoose");
const products_1 = require("./models/products");
const cart_1 = require("./models/cart");
const users_1 = require("../auth/model/users");
const core_1 = require("@nestjs/core");
let ProductsService = class ProductsService {
    constructor(ProductModel, userModal, cartModal, request, connection) {
        this.ProductModel = ProductModel;
        this.userModal = userModal;
        this.cartModal = cartModal;
        this.request = request;
        this.connection = connection;
    }
    async create(createProductDto) {
        const createdProduct = new this.ProductModel(Object.assign(Object.assign({}, createProductDto), { seller: this.request.user['id'] }));
        let user;
        try {
            user = await this.userModal.findById(this.request.user['id']);
        }
        catch (err) {
            console.log(err);
        }
        try {
            const sess = await this.connection.startSession();
            sess.startTransaction();
            await createdProduct.save({ session: sess });
            user.products.push(createdProduct);
            await user.save({ session: sess });
            await sess.commitTransaction();
        }
        catch (err) {
            console.log(err, user);
        }
        return createdProduct;
    }
    async getAll() {
        return this.ProductModel.find().exec();
    }
    async getProductbyId(id) {
        return this.ProductModel.findById(id);
    }
    async getProductsByUserId(id) {
        let userWithproducts;
        try {
            userWithproducts = await this.userModal.findById(id).populate('products');
        }
        catch (err) {
            console.log(err);
        }
        if (!userWithproducts) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'there is no product for provide id',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return userWithproducts.products;
    }
    async updateProduct(id, UpdateProductDto) {
        const product = await this.ProductModel.findById(id);
        if (product.seller != this.request.user['id']) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'this process not allowed',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        if (!product) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'there is no product for provide id',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        try {
            const newProduct = await this.ProductModel.findByIdAndUpdate(id, UpdateProductDto);
            await newProduct.save();
        }
        catch (err) {
            console.log(err);
        }
        return await this.ProductModel.findById(id);
    }
    async addToCart(id, amount) {
        const product = await this.ProductModel.findById(id);
        if (!product) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'there is no product for provide id',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const productInCart = await this.cartModal.findOne({ cart: id });
        if (!productInCart) {
            try {
                const sess = await this.connection.startSession();
                sess.startTransaction();
                const cart = await this.cartModal.create(Object.assign({ user: this.request.user['id'], cart: id }, amount));
                await cart.save({ session: sess });
                await sess.commitTransaction();
            }
            catch (err) {
                console.log(err);
            }
        }
        if (productInCart) {
            try {
                const sess = await this.connection.startSession();
                sess.startTransaction();
                const cart = await this.cartModal.findOne({ cart: id });
                await cart.updateOne({ amount: cart.amount + amount.amount });
                await cart.save();
                await sess.commitTransaction();
            }
            catch (err) {
                console.log(err);
            }
        }
        return { message: 'added to cart' };
    }
    async getProductsCart() {
        let userWithCarts;
        try {
            userWithCarts = await this.cartModal
                .find({ user: this.request.user['id'] })
                .populate('cart');
        }
        catch (err) {
            console.log(err);
        }
        if (!userWithCarts) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'there is no product for provide id',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return userWithCarts;
    }
    async deleteProductFromCart(id) {
        const product = await this.ProductModel.findById(id);
        if (!product) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: "we didn't find this product",
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const userWithCarts = await this.cartModal.findOne({
            cart: id,
        });
        if (userWithCarts.user != this.request.user['id']) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'this process not allowed',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        if (!userWithCarts) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: "we didn't find this product in your cart",
            }, common_1.HttpStatus.NOT_FOUND);
        }
        try {
            await userWithCarts.remove();
        }
        catch (err) {
            console.log(err);
        }
        return 'deleted';
    }
    async deleteProduct(id) {
        const product = await this.ProductModel.findById(id).populate('seller');
        if ((await (await this.ProductModel.findById(id)).seller) !=
            this.request.user['id']) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'this process not allowed',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        if (!product) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: "we didn't find this product",
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const user = await this.userModal.findById(this.request.user['id']);
        try {
            const start = await user.products.findIndex((element) => element === product._id);
            await user.products.splice(start, 1);
            await user.save();
            await product.remove();
            await product.save();
        }
        catch (err) {
            console.log(err);
        }
        return { message: 'successfuly deleted' };
    }
};
ProductsService = __decorate([
    common_1.Injectable({ scope: common_1.Scope.REQUEST }),
    __param(0, mongoose_1.InjectModel(products_1.Products.name)),
    __param(1, mongoose_1.InjectModel(users_1.User.name)),
    __param(2, mongoose_1.InjectModel(cart_1.Cart.name)),
    __param(3, common_1.Inject(core_1.REQUEST)),
    __param(4, mongoose_1.InjectConnection()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model, Object, mongoose.Connection])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map