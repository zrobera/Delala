import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { ExistingUserDto } from './dto/existing.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(payload: ExistingUserDto) {
    const user = await this.userService.findByEmail(payload.email);
    const oneUser = user[0];

    if (!oneUser) {
      throw new HttpException('incorrect email', HttpStatus.NOT_FOUND);
    }
    const checkPass = await bcrypt.compare(payload.password, oneUser.password);

    if (!checkPass) {
      throw new HttpException('incorrect password', HttpStatus.BAD_REQUEST);
    }
    const token = await this.jwtService.signAsync({ oneUser });
    return { role: oneUser.role, token, email: oneUser.email, id: oneUser._id };
  }
  async signup(payload: CreateUserDto) {
    const newUser = await this.userService.findByEmail(payload.email);

    if (newUser.length > 0) {
      throw new HttpException('email exists', HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt(10);
    const hahedPAss = await bcrypt.hash(payload.password, salt);
    const { email, userName, role } = payload;
    const user = await this.userService.create({
      userName,
      email,
      password: hahedPAss,
      role,
    });
    return user;
  }
}
