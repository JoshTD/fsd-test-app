import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.category.todos?.forEach((todo) => this.todos.push(todo));
  }

  addTodo() {
    console.log('TODO: Open form create todo');
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
