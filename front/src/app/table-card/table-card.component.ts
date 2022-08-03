import { Component, OnInit } from '@angular/core';
import { ICategory } from '../shared/models/category.interface';
import { ITodo } from '../shared/models/todo.interface';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
})
export class TableCardComponent implements OnInit {
  categories!: ICategory[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategoriesWithTodos().subscribe({
      next: (res) => {
        let categories: ICategory[] = Array.from(res.data.categories);
        this.categories = categories.sort((a, b) => a.id! - b.id!);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
