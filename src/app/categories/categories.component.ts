import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from "../services/category.service";
import {Message} from "../models/message.model";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  isLoading: boolean = false;
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private messageService: MessageService) {}

  ngOnInit() {
    this.isLoading = true;
    this.categoryService.fetchAllCategories().subscribe(categories => {
      this.categories = categories;
      this.isLoading = false;
    }, () => {
      const message = new Message(
        'Error',
        'Could not fetch categories!'
      )
      this.messageService.toggleToast(
        message
      );
    });
  }
}
