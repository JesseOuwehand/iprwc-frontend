import {Product} from "./product.model";

export class Category {
  public id: number;
  public name : string;
  public description: string;
  public imageUrl: string;
  public products: Array<Product>;

  constructor(name: string, description: string, imageUrl: string, products: Array<Product>) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.products = products;
  }
}
