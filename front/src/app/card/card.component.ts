import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '../shared/models/category.interface';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() category!: ICategory;

  constructor() {}

  ngOnInit(): void {}
}
