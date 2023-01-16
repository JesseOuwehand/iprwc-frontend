import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import { CategoryService } from "../../services/category.service";
import {Category} from "../../models/category.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MessageService} from "../../services/message.service";
import {Message} from "../../models/message.model";

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

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService) {}

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
            const message = new Message(
              'Error',
              'Could not fetch category!'
            )
            this.messageService.toggleToast(
              message
            );
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
      this.categoryService.updateCategory(this.categoryToUpdate).subscribe(() => {
        const message = new Message(
          'Success',
          'Category updated!'
        )
        this.messageService.toggleToast(
          message
        );
        this.router.navigate(['/admin'])
        this.isLoadingButton = false;
      }, () => {
        const message = new Message(
          'Error',
          'Something went wrong!'
        )
        this.messageService.toggleToast(
          message
        );
        this.isLoadingButton = false;
      });
    } else {
      const newCategory = new Category(
        this.addCategoryForm.get('categoryName').value,
        this.addCategoryForm.get('categoryDescription').value,
        this.addCategoryForm.get('categoryImage').value,
        []
      );
      this.categoryService.addCategory(newCategory).subscribe(() => {
        const message = new Message(
          'Success',
          'Category added!'
        )
        this.messageService.toggleToast(
          message
        );
        this.router.navigate(['/admin'])
        this.isLoadingButton = false;
      }, () => {
        const message = new Message(
          'Error',
          'Something went wrong!'
        )
        this.messageService.toggleToast(
          message
        );
        this.isLoadingButton = false;
      });
    }
  }
}
