import { Component, OnInit } from '@angular/core';
import { ICategory } from '../shared/models/category.interface';
import { ITodo } from '../shared/models/todo.interface';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
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

  onTodoEmit(todo: ITodo) {
    this.insertTodo(todo);
  }

  insertTodo(todo: ITodo) {
    let index = this.findCategoryIndexById(todo.category!.id!);

    if (index <= -1) {
      console.error('Category not found', todo.category);
      return;
    }

    let todoIndex = this.findTodoIndexById(index, todo.id!);

    let newTodo: ITodo = {
      id: todo.id,
      text: todo.text,
      isCompleted: todo.isCompleted,
    };

    let category = this.categories[index];

    let newCategory: ICategory;
    let newTodoArray: ITodo[];

    if (todoIndex >= 0) {
      // Если уже загружен в массив
      newTodoArray = [
        ...category.todos!.filter((item) => item.id !== newTodo.id),
        newTodo,
      ];
    } else {
      // Если не найден в массиве
      newTodoArray = [...category.todos!, newTodo];
    }

    newCategory = {
      id: category.id,
      title: category.title,
      todos: newTodoArray,
    };

    this.categories[index] = newCategory;
  }

  findCategoryIndexById(id: number) {
    return this.categories.findIndex((item) => item.id === id);
  }

  findCategoryByTitle(title: string) {
    return this.categories.find((item) => item.title === title);
  }

  findTodoIndexById(categoryIndex: number, id: number) {
    let todos = this.categories[categoryIndex].todos!;
    return todos.findIndex((item) => item.id === id);
  }
}
