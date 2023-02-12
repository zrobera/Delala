import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Delete, Query } from '@nestjs/common/decorators';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { CartDocument } from './cart.schema';
import { CartService } from './cart.service';
import { CartCreateDto } from './dtos/create.dto';

@Controller('/cart')
export class CartController {
  constructor(private readonly cartservice: CartService) {}

  @Get('/:userId')
  @UseGuards(JWTGuard)
  getAllHouse(@Param('userId') userId: string): Promise<CartDocument[]> {
    return this.cartservice.getCarts(userId);
  }
  @Post()
  @UseGuards(JWTGuard)
  createHouse(@Body() body: CartCreateDto): Promise<CartDocument> {
    return this.cartservice.createCart(body);
  }

  @Patch('/:cartId')
  @UseGuards(JWTGuard)
  updateHouse(
    @Param('cartId') cartId: string,
    @Body() body,
  ): Promise<CartDocument> {
    return this.cartservice.updateCart(cartId, body);
  }

  @Delete('/:cartId')
  @UseGuards(JWTGuard)
  deleteHouse(@Param('cartId') cartId: string): Promise<CartDocument> {
    return this.cartservice.deleteHouse(cartId);
  }
}
