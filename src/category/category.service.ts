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

  createCategory(categoryDto: CategoryDto): Observable<ICategory> {
    return from(this.categoryRepository.save(categoryDto));
  }

  updateCategory(categoryData: ICategory): Observable<Boolean> {
    return from(
      this.categoryRepository.update({ id: categoryData.id }, categoryData),
    ).pipe(
      map((result) => {
        if (result.affected !== null) return true;
        else return false;
      }),
    );
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
