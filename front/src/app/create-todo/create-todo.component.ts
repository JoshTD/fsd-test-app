import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { ICategory } from '../shared/models/category.interface';
import { ICategoryDto } from '../shared/models/categoryDto.interface';
import { EditMode } from '../shared/models/editMode.enum';
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
  @Output() onCreateCategory: EventEmitter<ICategory> =
    new EventEmitter<ICategory>();

  categories!: ICategory[];
  todoFormGroup!: FormGroup;
  categoryFormGroup!: FormGroup;

  constructor(
    private todoService: TodoService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { mode: EditMode; todo?: ITodo; category?: string },
  ) {}

  ngOnInit(): void {
    this.initCategoryValues();
    this.initFormGroup();
  }

  onNewCategory() {
    if (this.categoryFormGroup.valid) {
      this.categoryService
        .createCategory({
          ...this.categoryFormGroup.value,
        } as ICategoryDto)
        .subscribe({
          next: (res: any) => {
            let category = res.data.createCategory;
            this.categories = [...this.categories, category];
            this.todoFormGroup.setValue({
              ...this.todoFormGroup.value,
              category: category.title,
            });
            this.onCreateCategory.emit(category);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    }
  }

  onSubmit() {
    if (this.todoFormGroup.valid) {
      this.todoService
        .createTodo({
          ...this.todoFormGroup.value,
        } as ITodoDto)
        .subscribe({
          next: (res: any) => {
            let data = res.data.createTodo;
            this.closeForm(data);
          },
          error: (err: any) => {
            console.error(err);
            this.closeForm();
          },
        });
    }
  }

  onEdit() {
    if (this.todoFormGroup.valid) {
      this.todoService
        .updateTodo({
          ...this.data.todo,
          ...this.todoFormGroup.value,
        } as ITodo)
        .subscribe({
          next: (res: any) => {
            let data = res.data.updateTodo;
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
    if (this.data.todo?.id) {
      this.todoService.deleteTodo(this.data.todo.id).subscribe({
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
        return 'Новая задача';
      case EditMode.Edit:
        return 'Изменить задачу';
      case EditMode.View:
        return 'Удалить задачу';
      default:
        return 'Задача';
    }
  }

  initFormGroup() {
    switch (this.data.mode) {
      case EditMode.Add:
        this.todoFormGroup = this.fb.group({
          text: ['', [Validators.required]],
          category: [this.data.category ?? '', [Validators.required]],
        });
        this.categoryFormGroup = this.fb.group({
          title: ['', [Validators.required]],
        });
        break;
      case EditMode.Edit:
        this.todoFormGroup = this.fb.group({
          text: [this.data.todo?.text ?? '', [Validators.required]],
          category: [this.data.category ?? '', [Validators.required]],
        });
        this.categoryFormGroup = this.fb.group({
          title: ['', [Validators.required]],
        });
        break;
      case EditMode.View:
        this.todoFormGroup = this.fb.group({
          text: [
            { value: this.data.todo?.text ?? '', disabled: true },
            [Validators.required],
          ],
          category: [
            { value: this.data.category ?? '', disabled: true },
            [Validators.required],
          ],
        });
        this.categoryFormGroup = this.fb.group({
          title: [{ value: '', disabled: true }, [Validators.required]],
        });
        break;
      default:
        console.error('EditMode undefined');
        break;
    }
  }

  initCategoryValues() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data.categories.sort(
          (a: any, b: any) => a.id! - b.id!,
        );
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
