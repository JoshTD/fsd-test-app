import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { ICategory } from '../shared/models/category.interface';
import { ITodo } from '../shared/models/todo.interface';
import { ITodoDto } from '../shared/models/todoDto.interface';
import { CategoryService } from '../shared/services/category.service';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  categories!: ICategory[];
  todoFormGroup!: FormGroup;

  constructor(
    private todoService: TodoService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: string },
  ) {}

  ngOnInit(): void {
    this.initCategoryValues();
    this.initFormGroup();
  }

  onSubmit() {
    if (this.todoFormGroup.valid) {
      this.todoService
        .createTodo({
          ...this.todoFormGroup.value,
        } as ITodoDto)
        .subscribe({
          next: (res: any) => {
            let todo = res.data.createTodo;
            this.closeForm(todo);
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

  closeForm(todo?: ITodo) {
    if (todo) {
      this.dialogRef.close({ data: todo });
    } else this.dialogRef.close();
  }

  initFormGroup() {
    this.todoFormGroup = this.fb.group({
      text: ['', [Validators.required]],
      category: [this.data.category ?? '', [Validators.required]],
    });
  }

  initCategoryValues() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data.categories;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
