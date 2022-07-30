import { ITodo } from './todo.interface';

export interface ICategory {
  id?: number;
  title: string;
  todos: ITodo[];
}
