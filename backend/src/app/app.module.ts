import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CartModule } from 'src/cart/cart.module';
import { UserModule } from 'src/user/user.module';
import { HouseModule } from '../house/house.module';

@Module({
  imports: [
    HouseModule,
    CartModule,
    UserModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/delala'),
  ],
})
export class AppModule {}
