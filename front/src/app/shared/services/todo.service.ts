import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ITodo } from '../models/todo.interface';
import { ITodoDto } from '../models/todoDto.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private apollo: Apollo) {}

  getTodos(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          todos {
            id
            text
            isCompleted
          }
        }
      `,
    });
  }

  getTodosWithCategories(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          todos {
            id
            text
            isCompleted
            category {
              id
              title
            }
          }
        }
      `,
    });
  }

  getTodo(id: number): Observable<any> {
    return this.apollo.query({
      query: gql`
        query getTodo($id: Int!) {
          todo(id: $id) {
            id
            text
            isCompleted
          }
        }
      `,
      variables: { id },
    });
  }

  getTodoWithCategory(id: number): Observable<any> {
    return this.apollo.query({
      query: gql`
        query getTodo($id: Int!) {
          todo(id: $id) {
            id
            text
            isCompleted
            category {
              id
              title
            }
          }
        }
      `,
      variables: { id },
    });
  }

  createTodo({ category, text }: ITodoDto): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateTodo($category: String!, $text: String!) {
          createTodo(category: $category, text: $text) {
            id
            text
            isCompleted
          }
        }
      `,
      variables: { category, text },
    });
  }

  updateTodo({ id, text, isCompleted, category }: ITodo): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateTodo(
          $id: Int!
          $text: String
          $isCompleted: Boolean
          $category: String
        ) {
          updateTodo(
            id: $id
            text: $text
            isCompleted: $isCompleted
            category: $category
          ) {
            id
            text
            isCompleted
          }
        }
      `,
      variables: { id, text, isCompleted, category },
    });
  }

  deleteTodo(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteTodo($id: Int!) 
          deleteTodo(
            id: $id
          )
        `,
      variables: { id },
    });
  }
}
