import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import { CategoryService } from "../../services/category.service";
import {Category} from "../../models/category.model";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  addCategoryForm: FormGroup;
  isLoading: boolean = false;
  isLoadingButton: boolean = false;
  categoryToUpdate: Category;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] !== undefined) {
        this.isLoading = true;
        this.categoryService.fetchCategoryById(params['id'])
          .subscribe(category => {
            this.categoryToUpdate = category;
            this.addCategoryForm = new FormGroup({
              'categoryName': new FormControl(category.name, Validators.required),
              'categoryDescription': new FormControl(category.description, Validators.required),
              'categoryImage': new FormControl(category.imageUrl, Validators.required)
            });
            this.isLoading = false;
          }, () => {
            this.isLoading = false;
          })

      } else {
        this.addCategoryForm = new FormGroup({
          'categoryName': new FormControl('', Validators.required),
          'categoryDescription': new FormControl('', Validators.required),
          'categoryImage': new FormControl('', Validators.required)
        });
      }
    });
  }

  onSubmit() {
    this.isLoadingButton = true;
    if (this.categoryToUpdate !== undefined) {
      this.categoryToUpdate.name = this.addCategoryForm.get('categoryName').value
      this.categoryToUpdate.description = this.addCategoryForm.get('categoryDescription').value
      this.categoryToUpdate.imageUrl = this.addCategoryForm.get('categoryImage').value
      this.categoryService.updateCategory(this.categoryToUpdate).subscribe(response => {
        this.isLoadingButton = false;
      }, () => {
        this.isLoadingButton = false;
      });
    } else {
      const newCategory = new Category(
        this.addCategoryForm.get('categoryName').value,
        this.addCategoryForm.get('categoryDescription').value,
        this.addCategoryForm.get('categoryImage').value,
        []
      );
      this.categoryService.addCategory(newCategory).subscribe(response => {
        this.isLoadingButton = false;
      }, () => {
        this.isLoadingButton = false;
      });
    }
  }
}
