import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { Category } from 'src/category/models/category.model';
import { Todo } from './models/todo.model';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Category]), CategoryModule],
  providers: [TodoResolver, TodoService],
  exports: [TodoService],
})
export class TodoModule {}
