import ApiModel from "models/Abstract/ApiModel";
import Product from "models/Product"

export default class Shop extends ApiModel{
  constructor(id, name, description, products) {
    super(id)
    this.name = name
    this.description = description
    this.products = products
  }

  static endpoint() {
    return 'api/shops/'
  }

  static fromObject(obj){
    const products = Product.fromObjects(obj.products)
    return new Shop(obj.id, obj.name, obj.weight, products)
  }

}
