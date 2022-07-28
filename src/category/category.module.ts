import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/todo/models/todo.model';
import { TodoService } from 'src/todo/todo.service';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { Category } from './models/category.model';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Todo])],
  providers: [CategoryResolver, CategoryService, TodoService],
  exports: [CategoryService],
})
export class CategoryModule {}
