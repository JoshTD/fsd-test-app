import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CategoryDto } from './models/category.dto';
import { ICategory } from './models/category.interface';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<ICategory>,
  ) {}

  getAllCategories(): Observable<ICategory[]> {
    return from(this.categoryRepository.find());
  }

  getCategoryById(id: number): Observable<ICategory> {
    return from(this.categoryRepository.findOneBy({ id: id }));
  }

  getCategoryByTitle(title: string): Observable<ICategory> {
    return from(this.categoryRepository.findOneBy({ title: title }));
  }

  createCategory(categoryDto: CategoryDto): Observable<ICategory> {
    return from(this.categoryRepository.save(categoryDto));
  }

  updateCategory(categoryData: ICategory): Observable<ICategory> {
    this.categoryRepository.update({ id: categoryData.id }, categoryData);
    return this.getCategoryById(categoryData.id);
  }

  deleteCategory(id: number): Observable<Boolean> {
    return from(this.categoryRepository.delete({ id: id })).pipe(
      map((result) => {
        if (result.affected !== null) return true;
        else return false;
      }),
    );
  }
}
