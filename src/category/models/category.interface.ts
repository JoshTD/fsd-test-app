import { ITodo } from 'src/todo/models/todo.interface';

export interface ICategory {
  id?: number;
  title: string;
  todos: ITodo[];
}
