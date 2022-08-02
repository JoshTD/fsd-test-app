import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Todo } from 'src/todo/models/todo.model';
import { TodoService } from 'src/todo/todo.service';
import { CategoryService } from './category.service';
import { CategoryDto } from './models/category.dto';
import { ICategory } from './models/category.interface';
import { Category } from './models/category.model';

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(
    private categoryService: CategoryService,
    private todoService: TodoService,
  ) {}

  @Query((returns) => [Category])
  async categories() {
    return this.categoryService.getAllCategories();
  }

  @Query((returns) => Category)
  async category(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @Query((returns) => Category)
  async categoryTitle(@Args('title') title: string) {
    return this.categoryService.getCategoryByTitle(title);
  }

  @Mutation((returns) => Category)
  async createCategory(@Args('title') title: string) {
    return this.categoryService.createCategory({ title: title } as CategoryDto);
  }

  @Mutation((returns) => Category)
  async updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('title') title: string,
  ) {
    return this.categoryService.updateCategory({
      id: id,
      title: title,
    } as ICategory);
  }

  @Mutation((returns) => Boolean)
  async deleteCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.deleteCategory(id);
  }

  @ResolveField(() => [Todo], { nullable: true })
  async todos(@Parent() category: Category) {
    const { title } = category;
    return this.todoService.getTodosByCategory(title);
  }
}
