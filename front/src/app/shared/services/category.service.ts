import { Injectable } from '@angular/core';
import { ICategory } from '../models/category.interface';
import { ICategoryDto } from '../models/categoryDto.interface';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apollo: Apollo) {}

  getCategories(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          categories {
            id
            title
          }
        }
      `,
    });
  }

  getCategoriesWithTodos(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          categories {
            id
            title
            todos {
              id
              text
              isCompleted
            }
          }
        }
      `,
    });
  }

  getCategory(id: number): Observable<any> {
    return this.apollo.query({
      query: gql`
        query getCategory($id: Int!) {
          category(id: $id) {
            id
            title
          }
        }
      `,
      variables: { id },
    });
  }

  getCategoryWithTodos(id: number): Observable<any> {
    return this.apollo.query({
      query: gql`
        query getCategory($id: Int!) {
          category(id: $id) {
            id
            title
            todos {
              id
              text
              isCompleted
            }
          }
        }
      `,
      variables: { id },
    });
  }

  createCategory({ title }: ICategoryDto): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateCategory($title: String!) {
          createCategory(title: $title) {
            id
            title
          }
        }
      `,
      variables: { title },
    });
  }

  updateCategory({ id, title }: ICategory): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateCategory($id: Int!, $title: String!) 
          updateCategory(
            id: $id
            title: $title
          ) {
            id
            title
          }
        `,
      variables: { id, title },
    });
  }

  deleteCategory(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteCategory($id: Int!) 
          deleteCategory(
            id: $id
          )
        `,
      variables: { id },
    });
  }
}
