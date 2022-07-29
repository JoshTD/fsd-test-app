import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoDto } from './models/todo.dto';
import { ITodo } from './models/todo.interface';
import { Todo } from './models/todo.model';
import { TodoService } from './todo.service';

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

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
    @Args('category') category: string,
    @Args('text') text: string,
  ) {
    return this.todoService.createTodo({
      text: text,
      isCompleted: false,
      category: category,
    } as TodoDto);
  }

  @Mutation((returns) => Todo)
  async updateTodo(
    @Args('id', { type: () => Int }) id: number,
    @Args('text') text: string,
    @Args('isCompleted') isCompleted: boolean,
    @Args('category') category: string,
  ) {
    return this.todoService.updateTodo({
      id: id,
      text: text,
      isCompleted: isCompleted,
      category: category,
    } as ITodo);
  }

  @Mutation((returns) => Boolean)
  async deleteTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.deleteTodo(id);
  }
}
