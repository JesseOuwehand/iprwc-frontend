import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category.model";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  isLoading: boolean = false;
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.isLoading = true;
          this.categoryService.fetchCategoryById(params['id'])
            .subscribe(category => {
              this.category = category;
              this.isLoading = false;
            })
        }
      )
  }
}
