import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class TodoDto {
  @IsString()
  text: string;

  @IsBoolean()
  isCompleted?: boolean;

  @IsNumber()
  category: string;
}
