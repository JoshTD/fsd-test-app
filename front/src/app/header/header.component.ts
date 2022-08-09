import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { ICategory } from '../shared/models/category.interface';
import { EditMode } from '../shared/models/editMode.enum';
import { EventType } from '../shared/models/eventType.enum';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() onCategoryAdd: EventEmitter<ICategory> =
    new EventEmitter<ICategory>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  addCategory() {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      data: {
        mode: EditMode.Add,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let newCategory = result.data;
        this.onCategoryAdd.emit(newCategory);
      }
    });
  }
}
