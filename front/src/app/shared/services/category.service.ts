import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/category.interface';
import { ICategoryDto } from '../models/categoryDto.interface';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient, private apollo: Apollo) {}

  getCategories() {
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

  // getCategory(id: number) {
  //   // TODO: FIX querry
  //   return this.apollo.query({
  //     query: gql`
  //       query getCategory($id: Int!) {
  //         category(id: $id) {
  //           id
  //           title
  //         }
  //       }
  //     `,
  //     variables: { id },
  //   });
  // }

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

  updateCategory({ id, title }: ICategory) {
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

  deleteCategory(id: number) {
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
