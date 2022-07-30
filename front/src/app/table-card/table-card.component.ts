import { Component, OnInit } from '@angular/core';
import { ICategory } from '../shared/models/category.interface';

@Component({
  selector: 'table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
})
export class TableCardComponent implements OnInit {
  categories: ICategory[] = [
    {
      id: 1,
      title: 'Семья',
      todos: [
        {
          id: 1,
          text: 'Купить молоко 1',
          isCompleted: false,
        },
        {
          id: 2,
          text: 'Купить молоко 2',
          isCompleted: false,
        },
        {
          id: 3,
          text: 'Купить молоко 3',
          isCompleted: true,
        },
      ],
    },
    {
      id: 2,
      title: 'Работа',
      todos: [
        {
          id: 4,
          text: 'Делать работу 4',
          isCompleted: true,
        },
        {
          id: 5,
          text: 'Делать работу 5',
          isCompleted: false,
        },
        {
          id: 6,
          text: 'Делать работу 6',
          isCompleted: false,
        },
        {
          id: 7,
          text: 'Делать работу 7',
          isCompleted: true,
        },
      ],
    },
    {
      id: 3,
      title: 'Прочее',
      todos: [
        {
          id: 8,
          text: 'Что-то там сделать 8',
          isCompleted: false,
        },
        {
          id: 9,
          text: 'Что-то там сделать 9',
          isCompleted: false,
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
