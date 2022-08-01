import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
            console.log(category);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      this.closeForm();
    }
  }

  onCancel() {
    this.closeForm();
  }

  closeForm() {
    console.log('TODO: Close form');
  }

  initFormGroup() {
    this.categoryFormGroup = this.fb.group({
      title: ['', [Validators.required]],
    });
  }
}
