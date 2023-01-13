export class ProductDto {
  public id: number;
  public name: string;
  public description: string;
  public imageUrl: string;
  public price: number;
  public inventory: number;
  public categoryId: number;

  constructor(
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    inventory: number,
    categoryId: number) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.inventory = inventory;
    this.categoryId = categoryId;
  }
}
