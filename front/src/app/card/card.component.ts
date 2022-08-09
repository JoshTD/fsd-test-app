import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { ICategory } from '../shared/models/category.interface';
import { EditMode } from '../shared/models/editMode.enum';
import { EventType } from '../shared/models/eventType.enum';
import { ITodo } from '../shared/models/todo.interface';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() category!: ICategory;
  @Output() onTodoChange: EventEmitter<ITodo> = new EventEmitter<ITodo>();
  @Output() onCategoryChange: EventEmitter<[ICategory, EventType]> =
    new EventEmitter<[ICategory, EventType]>();

  todos: ITodo[] = [];

  constructor(private todoService: TodoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    let todos: ITodo[] = [];
    this.category.todos!.forEach((todo) => todos.push(todo));
    this.todos = todos.sort((a, b) => a.id! - b.id!);
  }

  addTodo() {
    const data = {
      mode: EditMode.Add,
      category: this.category.title,
    };
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let newTodo = result.data;
        if (newTodo.category.title === this.category.title) {
          this.addTodoData(newTodo);
        } else {
          this.onTodoChange.emit(newTodo);
        }
      }
    });
  }

  editTodo(todo: ITodo) {
    const data = {
      mode: EditMode.Edit,
      todo: todo,
      category: this.category.title,
    };
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let newTodo = result.data;
        if (newTodo.category.title === this.category.title) {
          this.updateTodoData(newTodo);
        } else {
          this.deleteTodoData(newTodo.id);
          this.onTodoChange.emit(newTodo);
        }
      }
    });
  }

  viewTodo(todo: ITodo) {
    const data = {
      mode: EditMode.View,
      todo: todo,
      category: this.category.title,
    };
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.data.deleteTodo) this.deleteTodoData(todo.id!);
      }
    });
  }

  editCategory(category: ICategory) {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      data: {
        mode: EditMode.Edit,
        category: category,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let newCategory = result.data;
        this.onCategoryChange.emit([newCategory, EventType.Edit]);
      }
    });
  }

  viewCategory(category: ICategory) {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      data: {
        mode: EditMode.View,
        category: category,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.data.deleteCategory) {
          this.onCategoryChange.emit([category, EventType.Delete]);
        }
      }
    });
  }

  onStateChange(todo: ITodo) {
    this.todoService
      .updateTodo({
        id: todo.id,
        text: todo.text,
        isCompleted: !todo.isCompleted,
      })
      .subscribe({
        next: (res) => {
          let newTodo: ITodo = res.data.updateTodo;
          this.updateTodoData(newTodo);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  findTodoIndexById(id: number) {
    return this.todos.findIndex((item) => item.id === id);
  }

  addTodoData(todo: ITodo) {
    this.todos.push({
      id: todo.id,
      text: todo.text,
      isCompleted: todo.isCompleted,
    });
  }

  updateTodoData(todo: ITodo) {
    let index = this.findTodoIndexById(todo.id!);
    if (index > -1) {
      this.todos[index] = todo;
    } else {
      console.error('Todo not found', todo);
    }
  }

  deleteTodoData(id: number) {
    let index = this.findTodoIndexById(id);
    if (index > -1) {
      this.todos.splice(index, 1);
    } else {
      console.error('Todo id not found', id);
    }
  }
}
