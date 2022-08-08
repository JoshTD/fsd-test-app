import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { ICategory } from '../shared/models/category.interface';
import { EditMode } from '../shared/models/editMode.enum';
import { ITodo } from '../shared/models/todo.interface';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() category!: ICategory;

  todos: ITodo[] = [];

  constructor(private todoService: TodoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.category.todos!.forEach((todo) => this.todos.push(todo));
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
          console.log('TODO: Send to another card');
        }
      }
    });
    // TODO: UpdateTodo
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
          console.log('TODO: Send to another card');
        }
      }
    });
    // TODO: UpdateTodo
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
    this.todos[index] = todo;
  }

  deleteTodoData(id: number) {
    let index = this.findTodoIndexById(id);
    this.todos.splice(index, 1);
  }
}
