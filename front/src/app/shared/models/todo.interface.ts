import { ICategory } from './category.interface';

export interface ITodo {
  id?: number;
  text: string;
  isCompleted: boolean;
  category?: ICategory[];
}
