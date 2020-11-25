import Price from "models/Price"

export default class Product {
  constructor (name, weight, gold, silver, copper) {
    this.name = name
    this.weight = weight
    this.price = new Price(gold, silver, copper)
  }

  static fromObject(obj){
    return new Product(obj.name, obj.weight, obj.gp_price, obj.sp_price, 0)
  }
  static fromObjects(array){
    return array.map((rawProduct) => Product.fromObject(rawProduct))
  }

  get price_str() {
    return this.price.toString()
  }

  get weight_str() {
    return this.weight.toLocaleString()
  }

}