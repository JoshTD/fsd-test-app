import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { ICategory } from '../shared/models/category.interface';
import { EditMode } from '../shared/models/editMode.enum';
import { EventType } from '../shared/models/eventType.enum';
import { ITodo } from '../shared/models/todo.interface';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() onTodoCreate: EventEmitter<ITodo> = new EventEmitter<ITodo>();
  @Output() onCategoryCreate: EventEmitter<[ICategory, EventType]> =
    new EventEmitter<[ICategory, EventType]>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  addTodo() {
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      data: {
        mode: EditMode.Add,
      },
    });
    dialogRef.componentInstance.onCreateCategory.subscribe({
      next: (category: ICategory) => {
        this.onCategoryCreate.emit([category, EventType.Add]);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let newTodo = result.data;
        this.onTodoCreate.emit(newTodo);
      }
    });
  }
}
