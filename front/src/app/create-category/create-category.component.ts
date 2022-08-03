import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '../shared/models/category.interface';
import { ICategoryDto } from '../shared/models/categoryDto.interface';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  categoryFormGroup!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  onSubmit() {
    if (this.categoryFormGroup.valid) {
      this.categoryService
        .createCategory({
          ...this.categoryFormGroup.value,
        } as ICategoryDto)
        .subscribe({
          next: (res: any) => {
            let category = res.data.createCategory;
            this.closeForm(category);
          },
          error: (err: any) => {
            console.error(err);
            this.closeForm();
          },
        });
    }
  }

  onCancel() {
    this.closeForm();
  }

  closeForm(category?: ICategory) {
    if (category) {
      this.dialogRef.close({ data: category });
    } else this.dialogRef.close();
  }

  initFormGroup() {
    this.categoryFormGroup = this.fb.group({
      title: ['', [Validators.required]],
    });
  }
}
