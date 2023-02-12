import { IsNumber, IsPositive } from 'class-validator';
// import { IsPositive } from 'class-validator/types/decorator/decorators';

export class createHouseDto {
  @IsNumber()
  price: number;

  description: string;

  @IsNumber()
  bed: number;

  @IsNumber()
  bathroom: number;

  @IsNumber()
  parking: number;

  photos: string[];
  video: string;
  relator: string;

  year_build: number;

  @IsNumber()
  garage: number;

  @IsNumber()
  @IsPositive()
  area: number;

  location: string;
}
