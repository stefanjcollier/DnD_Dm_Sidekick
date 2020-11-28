import ApiModel from "models/Abstract/ApiModel";
import Price from "models/Price"

export default class Product extends ApiModel{
  constructor (id, name, weight, gold, silver, copper) {
    super(id)
    this.name = name
    this.weight = weight
    this.price = new Price(gold, silver, copper)
  }

  static endpoint() {
    return 'api/products/'
  }

  static fromObject(obj){
    return new Product(obj.id, obj.name, obj.weight, obj.gp_price, obj.sp_price, 0)
  }

  get price_str() {
    return this.price.toString()
  }

  get weight_str() {
    return this.weight.toLocaleString()
  }

}