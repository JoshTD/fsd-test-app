import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Todo } from 'src/todo/models/todo.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ unique: true, nullable: false })
  @Field({ description: 'Category title' })
  title: string;

  @OneToMany((type) => Todo, (todo) => todo.category)
  @Field((type) => [Todo], { nullable: true })
  todos: Todo[];
}
