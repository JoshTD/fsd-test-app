import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Category } from './models/category.model';

@Resolver((of) => Category)
export class CategoryResolver {
  @Query((returns) => [Category])
  async categories() {
    return [
      { id: 1, title: 'Cat. 1' },
      { id: 2, title: 'Cat. 2' },
    ];
  }
}
