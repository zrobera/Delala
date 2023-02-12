import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Delete, Query } from '@nestjs/common/decorators';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/user/user.schema';
import { createHouseDto } from './dto/createHouse.dto';
import { UpdateHouseDto } from './dto/updateHouse.dto';
import { HouseDocument } from './house.schema';
import { HouseService } from './house.service';

@Controller('houses')
export class HouseController {
  constructor(private readonly houseservice: HouseService) {}

  @Get()
  @UseGuards(JWTGuard, RolesGuard)
  getAllHouse(@Query() queryString): Promise<HouseDocument[]> {
    const value = queryString ?? {};
    return this.houseservice.getHouses(value);
  }

  @UseGuards(JWTGuard, RolesGuard)
  @Get('/:houseId')
  getSinglelHouse(@Param('houseId') houseId: string): Promise<HouseDocument> {
    return this.houseservice.getHouseById(houseId);
  }
  @Roles(Role.ADMIN)
  @UseGuards(JWTGuard, RolesGuard)
  @Post()
  createHouse(@Body() body: createHouseDto): Promise<HouseDocument> {
    return this.houseservice.createHouse(body);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JWTGuard, RolesGuard)
  @Patch('/:houseId')
  updateHouse(
    @Param('houseId') houseId: string,
    @Body() body: UpdateHouseDto,
  ): Promise<HouseDocument> {
    return this.houseservice.updateHouse(houseId, body);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JWTGuard, RolesGuard)
  @Delete('/:houseId')
  deleteHouse(@Param('houseId') houseId: string): Promise<HouseDocument> {
    return this.houseservice.deleteHouse(houseId);
  }
}
