import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategory } from '../shared/models/category.interface';
import { ICategoryDto } from '../shared/models/categoryDto.interface';
import { EditMode } from '../shared/models/editMode.enum';
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
    @Inject(MAT_DIALOG_DATA)
    public data: { mode: EditMode; category?: ICategory },
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

  onEdit() {
    if (this.categoryFormGroup.valid) {
      const newCategory: ICategory = {
        ...this.data.category,
        ...this.categoryFormGroup.value,
      };
      this.categoryService.updateCategory(newCategory).subscribe({
        next: (res: any) => {
          let data = res.data.updateCategory;
          this.closeForm(data);
        },
        error: (err: any) => {
          console.error(err);
          this.closeForm();
        },
      });
    }
  }

  onDelete() {
    if (this.data.category?.id) {
      this.categoryService.deleteCategory(this.data.category.id).subscribe({
        next: (res: any) => {
          let data = res.data;
          this.closeForm(data);
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

  closeForm(data?: any) {
    data ? this.dialogRef.close({ data: data }) : this.dialogRef.close();
  }

  getEditMode() {
    return EditMode;
  }

  getCardTitle() {
    switch (this.data.mode) {
      case EditMode.Add:
        return 'Новая категория';
      case EditMode.Edit:
        return 'Изменить категорию';
      case EditMode.View:
        return 'Удалить категорию';
      default:
        return 'Категория';
    }
  }

  initFormGroup() {
    switch (this.data.mode) {
      case EditMode.Add:
        this.categoryFormGroup = this.fb.group({
          title: ['', [Validators.required]],
        });
        break;
      case EditMode.Edit:
        this.categoryFormGroup = this.fb.group({
          title: [this.data.category?.title ?? '', [Validators.required]],
        });
        break;
      case EditMode.View:
        this.categoryFormGroup = this.fb.group({
          title: [
            { value: this.data.category?.title ?? '', disabled: true },
            [Validators.required],
          ],
        });
        break;
      default:
        console.error('EditMode undefined');
        break;
    }
  }
}
