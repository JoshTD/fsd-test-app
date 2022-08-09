import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from '../shared/models/category.interface';
import { EventType } from '../shared/models/eventType.enum';
import { ITodo } from '../shared/models/todo.interface';

@Component({
  selector: 'table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
})
export class TableCardComponent implements OnInit {
  @Input() categories!: ICategory[];
  @Output() onTodoEmit: EventEmitter<ITodo> = new EventEmitter<ITodo>();
  @Output() onCategoryEmit: EventEmitter<[ICategory, EventType]> =
    new EventEmitter<[ICategory, EventType]>();

  constructor() {}

  ngOnInit(): void {}

  onTodoChange(todo: ITodo) {
    this.onTodoEmit.emit(todo);
  }

  onCategoryChange(data: [ICategory, EventType]) {
    this.onCategoryEmit.emit(data);
  }
}
