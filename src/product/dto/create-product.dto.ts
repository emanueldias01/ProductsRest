import {
  IsNotEmpty,
  MaxLength,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @Min(1)
  @IsNumber()
  price: number;
}
