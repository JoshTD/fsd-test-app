import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(CreateCategoryComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result.data);
      }
    });
  }

  ngOnInit(): void {}

  addCategory() {
    this.openDialog();
  }
}
