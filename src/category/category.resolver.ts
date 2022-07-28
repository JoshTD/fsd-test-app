import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryDto } from './models/category.dto';
import { ICategory } from './models/category.interface';
import { Category } from './models/category.model';

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query((returns) => [Category])
  async categories() {
    return this.categoryService.getAllCategories();
  }

  @Query((returns) => Category)
  async category(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @Mutation((returns) => Category)
  async createCategory(@Args('title') title: string) {
    return this.categoryService.createCategory({ title: title } as CategoryDto);
  }

  @Mutation((returns) => Boolean)
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
}
