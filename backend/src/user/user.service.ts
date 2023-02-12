import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  create(payload: {
    userName: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<UserDocument> {
    const newUser = new this.userModel(payload);
    return newUser.save();
  }
  async findById(id: string) {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('incorrect id  ', HttpStatus.NOT_FOUND);
    }
    if (!user) {
      throw new HttpException('file not found  ', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByEmail(email: string) {
    let user;
    try {
      user = await this.userModel.find({ email }).exec();
    } catch (error) {
      throw new HttpException('incorrect id  ', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  findAll() {
    const users = this.userModel.find().exec();
    return users;
  }
}
