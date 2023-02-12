import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartDocument } from './cart.schema';
import { CartCreateDto } from './dtos/create.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private cartModel: Model<CartDocument>) {}

  async getCarts(userId: string): Promise<CartDocument[]> {
    return this.cartModel.find({ userId });
  }
  async createCart(payload: CartCreateDto): Promise<CartDocument> {
    const newHouse = new this.cartModel(payload);
    return newHouse.save();
  }

  async updateCart(id: string, payload): Promise<CartDocument> {
    let existingCart;
    try {
      existingCart = await this.cartModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('file not found', HttpStatus.NOT_FOUND);
    }
    if (!existingCart) {
      throw new HttpException('file not found ', HttpStatus.NOT_FOUND);
    }
    existingCart.count = payload.coumt ?? existingCart.count;
    const house = await existingCart.save();
    return house;
  }

  async deleteHouse(id: string): Promise<CartDocument> {
    let deletedHouse;
    try {
      deletedHouse = await this.cartModel.findByIdAndDelete({ _id: id }).exec();
    } catch (error) {
      throw new HttpException('file not found  ', HttpStatus.NOT_FOUND);
    }
    if (!deletedHouse) {
      throw new HttpException('file not found ', HttpStatus.NOT_FOUND);
    }
    return deletedHouse;
  }
}
