import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested, IsDate, IsNumberString } from "class-validator";
import { Transform, Type } from "class-transformer";

export class Item {
  @ApiProperty({
    description: 'Short description of the item.',
    example: 'Blue T-Shirt'
  })
  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @ApiProperty({
    description: 'Price of the item represented as a string.',
    type: String,
    example: '50.75',
  })
  @IsNumber()
  @Transform((params) => parseFloat(params.value))
  price: number;
}

export class ReceiptDto {
  @ApiProperty({
    description: 'The retailer or store where the purchase was made.',
    example: 'Store XYZ'
  })
  @IsString()
  @IsNotEmpty()
  retailer: string;

  @ApiProperty({
    description: 'The date of purchase.',
    type: String,
    example: '2023-01-01'
  })
  @IsDate()
  @Type(() => Date)
  purchaseDate: Date;

  @ApiProperty({
    description: 'The time of purchase.',
    type: String,
    example: '14:30:00'
  })
  @IsString()
  purchaseTime: string; // Changed type to string

  @ApiProperty({
    description: 'The total amount paid for the purchase.',
    type: String,
    example: '150.50'
  })
  @IsNumber()
  @Transform((params) => parseFloat(params.value))
  total: number;

  @ApiProperty({
    description: 'The items purchased.',
    type: [Item],
    example: [
      { shortDescription: 'Blue T-Shirt', price: 50.75 },
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];
}
