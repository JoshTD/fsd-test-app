import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from '../shared/models/category.interface';
import { ITodo } from '../shared/models/todo.interface';

@Component({
  selector: 'table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
})
export class TableCardComponent implements OnInit {
  @Input() categories!: ICategory[];
  @Output() onTodoEmit: EventEmitter<ITodo> = new EventEmitter<ITodo>();

  constructor() {}

  ngOnInit(): void {}

  onTodoChange(todo: ITodo) {
    this.onTodoEmit.emit(todo);
  }
}
