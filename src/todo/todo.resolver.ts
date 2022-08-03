import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
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
    @Args('text', { nullable: true }) text: string,
    @Args('isCompleted', { nullable: true }) isCompleted: boolean,
    @Args('category', { nullable: true }) category: string,
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

  @ResolveField(() => [Category], { nullable: true })
  async category(@Parent() todo: Todo) {
    const { category } = todo;
    return this.categoryService.getCategoryByTitle(category.toString());
  }
}
