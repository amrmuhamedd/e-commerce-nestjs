import {
  Injectable,
  Scope,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Model } from 'mongoose';
import { Products, ProductDocumenet } from './models/products';
import { Cart, CartDocumenet } from './models/cart';
import { User, UsersDocumenet } from '../auth/model/users';

import { CreateProductDto } from './products.Dto/creatproduct.dto';
import { UpdateProductDto } from './products.Dto/upadateProduct.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private ProductModel: Model<ProductDocumenet>,
    @InjectModel(User.name) private userModal: Model<UsersDocumenet>,
    @InjectModel(Cart.name) private cartModal: Model<CartDocumenet>,
    @Inject(REQUEST) private request: Request,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

async create(createProductDto: CreateProductDto): Promise<Products> {
  const session = await this.connection.startSession();
  session.startTransaction();

  try {
    const createdProduct = new this.ProductModel({
      ...createProductDto,
      seller: this.request.user['id'],
    });

    await createdProduct.save({ session });

    const user = await this.userModal.findById(this.request.user['id']);
    user.products.push(createdProduct);
    await user.save({ session });

    await session.commitTransaction();

    return createdProduct;
  } catch (error) {
    await session.abortTransaction();
    throw error; // Rethrow the error to handle it at the controller level
  } finally {
    session.endSession();
  }
}

  async getAll(): Promise<Products[]> {
    return this.ProductModel.find().exec();
  }
  async getProductbyId(id) {
     const product = await this.productsService.getProductbyId(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return this.ProductModel.findById(id);
  }

  async getProductsByUserId(id) {
    let userWithproducts;
    try {
      userWithproducts = await this.userModal.findById(id).populate('products');
    } catch (err) {
      console.log(err);
    }

    if (!userWithproducts) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'there is no product for provide id',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return userWithproducts.products;
  }
  async updateProduct(id, UpdateProductDto: UpdateProductDto) {
    const product = await this.ProductModel.findById(id);
    if (product.seller != this.request.user['id']) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'this process not allowed',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'there is no product for provide id',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      const newProduct = await this.ProductModel.findByIdAndUpdate(
        id,
        UpdateProductDto,
      );
      await newProduct.save();
    } catch (err) {
      console.log(err);
    }
    return await this.ProductModel.findById(id);
  }
  async addToCart(id, amount) {
    const product = await this.ProductModel.findById(id);
    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'there is no product for provide id',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const productInCart = await this.cartModal.findOne({ cart: id });
    if (!productInCart) {
      try {
        const sess = await this.connection.startSession();
        sess.startTransaction();
        const cart = await this.cartModal.create({
          user: this.request.user['id'],
          cart: id,
          ...amount,
        });
        await cart.save({ session: sess });
        await sess.commitTransaction();
      } catch (err) {
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
      } catch (err) {
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
    } catch (err) {
      console.log(err);
    }
    if (!userWithCarts) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'there is no product for provide id',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return userWithCarts;
  }
  async deleteProductFromCart(id) {
    const product = await this.ProductModel.findById(id);

    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "we didn't find this product",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const userWithCarts = await this.cartModal.findOne({
      cart: id,
    });
    if (userWithCarts.user != this.request.user['id']) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'this process not allowed',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    if (!userWithCarts) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "we didn't find this product in your cart",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await userWithCarts.remove();
    } catch (err) {
      console.log(err);
    }

    return 'deleted';
  }
  async deleteProduct(id) {
    const product = await this.ProductModel.findById(id).populate('seller');
    if (
      (await (await this.ProductModel.findById(id)).seller) !=
      this.request.user['id']
    ) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'this process not allowed',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "we didn't find this product",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const user = await this.userModal.findById(this.request.user['id']);
    try {
      const start = await user.products.findIndex(
        (element) => element === product._id,
      );
      await user.products.splice(start, 1);
      await user.save();
      await product.remove();
      await product.save();
    } catch (err) {
      console.log(err);
    }

    return { message: 'successfuly deleted' };
  }
}
