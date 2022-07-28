import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { map } from 'rxjs';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/models/category.model';
import { TodoDto } from './models/todo.dto';
import { ITodo } from './models/todo.interface';
import { Todo } from './models/todo.model';
import { TodoService } from './todo.service';

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(
    private todoService: TodoService,
    private categoryService: CategoryService,
  ) {}

  @Query((returns) => [Todo])
  async todos() {
    return this.todoService.getAllTodos();
  }

  @Query((returns) => Todo)
  async todo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.getTodoById(id);
  }

  @Mutation((returns) => Todo)
  async createTodo(
    @Args('categoryId', { type: () => Int }) categoryId: number, // TODO
    @Args('text') text: string,
  ) {
    return this.todoService.createTodo({
      text: text,
      isCompleted: false,
      category: categoryId,
    } as TodoDto);
  }

  @Mutation((returns) => Todo)
  async updateTodo(
    @Args('id', { type: () => Int }) id: number,
    @Args('text') text: string,
    @Args('isCompleted') isCompleted: boolean,
  ) {
    return this.todoService.updateTodo({
      id: id,
      text: text,
      isCompleted: isCompleted,
    } as ITodo);
  }

  @Mutation((returns) => Boolean)
  async deleteTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.deleteTodo(id);
  }
}
