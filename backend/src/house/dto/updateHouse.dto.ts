import { IsNumber, IsOptional, IsPositive } from 'class-validator';
// import { IsPositive } from 'class-validator/types/decorator/decorators';

export class UpdateHouseDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  description: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  bed: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  bathroom: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  parking: number;

  @IsOptional()
  photos: string[];

  @IsOptional()
  video: string;

  @IsOptional()
  relator: string;

  @IsOptional()
  year_build: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  garage: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  area: number;

  @IsOptional()
  location: string;
  @IsOptional()
  propert_type: string;
}
