import { Category } from "./category.model";

export class Product {
  public id: number;
  public name: string;
  public description: string;
  public imageUrl: string;
  public price: number;
  public inventory: number;
  public category: Category;

  constructor(
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    inventory: number,
    category: Category) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.inventory = inventory;
    this.category = category
  }
}
