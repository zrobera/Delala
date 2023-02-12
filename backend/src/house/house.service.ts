import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createHouseDto } from './dto/createHouse.dto';
import { UpdateHouseDto } from './dto/updateHouse.dto';
import { House, HouseDocument, PRICE, STATUS } from './house.schema';

@Injectable()
export class HouseService {
  constructor(@InjectModel('House') private houseModel: Model<HouseDocument>) {}

  async getHouses(queryString): Promise<HouseDocument[]> {
    let query: {
      status?: STATUS;
      price_range?: PRICE;
      location?: any;
      bed?: number;
      sort?: string;
    } = {};

    if (queryString.status) {
      query.status = queryString.status;
    }
    if (queryString.price_range) {
      query.price_range = queryString.price_range;
    }
    if (queryString.location) {
      query.location = { $regex: queryString.location, $options: 'i' };
    }
    if (queryString.bed) {
      query.bed = queryString.bed;
    }
    let result = this.houseModel.find(query);

    if (queryString.sort) {
      const sort_param = queryString.sort.split(',').join(' ');
      result = result.sort(sort_param);
    }
    const limit = Number(queryString.limit) || 2;
    const page = Number(queryString.page) || 1;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const house = result.exec();
    return house;
  }

  async getHouseById(id: string): Promise<HouseDocument> {
    let house;
    try {
      house = await this.houseModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('file not found ', HttpStatus.NOT_FOUND);
    }
    if (!house) {
      throw new HttpException('file not found ', HttpStatus.NOT_FOUND);
    }
    return house;
  }
  async createHouse(payload: createHouseDto): Promise<HouseDocument> {
    const newHouse = new this.houseModel(payload);
    return newHouse.save();
  }

  async updateHouse(
    id: string,
    payload: UpdateHouseDto,
  ): Promise<HouseDocument> {
    let existingHouse;
    try {
      existingHouse = await this.houseModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('file not found', HttpStatus.NOT_FOUND);
    }
    if (!existingHouse) {
      throw new HttpException('file not found ', HttpStatus.NOT_FOUND);
    }
    // existingHouse = await this.houseModel.findById(id).exec();
    existingHouse.price = payload.price ?? existingHouse.price;
    existingHouse.description =
      payload.description ?? existingHouse.description;
    existingHouse.bed = payload.bed ?? existingHouse.bed;
    existingHouse.bathroom = payload.bathroom ?? existingHouse.bathroom;
    existingHouse.garage = payload.garage ?? existingHouse.garage;
    existingHouse.photos = payload.photos ?? existingHouse.photos;
    existingHouse.parking = payload.parking ?? existingHouse.parking;
    existingHouse.relator = payload.relator ?? existingHouse.relator;
    existingHouse.video = payload.video ?? existingHouse.video;
    existingHouse.location = payload.location ?? existingHouse.location;
    existingHouse.year_build = payload.year_build ?? existingHouse.year_build;
    existingHouse.area = payload.area ?? existingHouse.area;
    existingHouse.propert_type =
      payload.propert_type ?? existingHouse.propert_type;

    const house = await existingHouse.save();
    return house;
  }

  async deleteHouse(id: string): Promise<HouseDocument> {
    let deletedHouse;
    try {
      deletedHouse = await this.houseModel
        .findByIdAndDelete({ _id: id })
        .exec();
    } catch (error) {
      throw new HttpException('file not found  ', HttpStatus.NOT_FOUND);
    }
    if (!deletedHouse) {
      throw new HttpException('file not found ', HttpStatus.NOT_FOUND);
    }
    return deletedHouse;
  }
}
