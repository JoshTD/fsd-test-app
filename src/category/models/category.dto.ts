import { IsNumber, IsString } from 'class-validator';

export class CategoryDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;
}
