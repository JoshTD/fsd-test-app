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
          text: 'Что-то там сделать 9, Очень длинное название прям сильно очень очень',
          isCompleted: false,
        },
      ],
    },
    {
      id: 4,
      title: 'Тестирование',
      todos: [
        {
          id: 10,
          text: 'Что-то там протестировать 10',
          isCompleted: false,
        },
        {
          id: 11,
          text: 'Что-то там протестировать 11',
          isCompleted: true,
        },
        {
          id: 12,
          text: 'Что-то там протестировать 12',
          isCompleted: true,
        },
        {
          id: 13,
          text: 'Что-то там протестировать 13',
          isCompleted: true,
        },
        {
          id: 14,
          text: 'Что-то там протестировать 14',
          isCompleted: false,
        },
        {
          id: 15,
          text: 'Что-то там протестировать 15',
          isCompleted: true,
        },
        {
          id: 16,
          text: 'Что-то там протестировать 16',
          isCompleted: true,
        },
        {
          id: 17,
          text: 'Что-то там протестировать 17',
          isCompleted: true,
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
