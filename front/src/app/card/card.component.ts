import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { ICategory } from '../shared/models/category.interface';
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
    this.category.todos?.forEach((todo) => this.todos.push(todo));
  }

  addTodo() {
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      data: { category: this.category.title },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result.data);
      }
    });
  }

  onStateChange(todo: ITodo) {
    let changed: ITodo = { ...todo };
    changed.isCompleted = !changed.isCompleted;
    this.todoService.updateTodo(changed).subscribe({
      next: (res) => {
        console.log(res.data.updateTodo);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
