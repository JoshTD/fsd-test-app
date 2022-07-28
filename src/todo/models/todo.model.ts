import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/models/category.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ nullable: false })
  @Field()
  text: string;

  @Column({ default: false, nullable: false })
  @Field((type) => Boolean)
  isCompleted: boolean;

  @ManyToOne((type) => Category, (category) => category.todos)
  @JoinColumn({ name: 'category', referencedColumnName: 'id' })
  @Field((type) => Category, { nullable: true })
  category: Category;
}
