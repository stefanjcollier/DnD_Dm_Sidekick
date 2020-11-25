export default class Product {
  constructor (name, weight, gold, silver, copper) {
    this.name = name
    this.weight = weight
    this.gold = gold
    this.silver = silver
    this.copper = copper
  }

  static fromObject(obj){
    return new Product(obj.name, obj.weight, obj.gp_price, obj.sp_price, 0)
  }
  static fromObjects(array){
    return array.map((rawProduct) => Product.fromObject(rawProduct))
  }

  static price_str(gold, silver, copper){
    let items = []
    if (gold) {
      items.push(`${gold.toLocaleString()} Gold`)
    }
    if (silver) {
      items.push(`${silver.toLocaleString()} Silver`)
    }
    if (copper) {
      items.push(`${copper.toLocaleString()} Copper`)
    }
    return items.join(', ')
  }

  get price_str() {
    return Product.price_str(this.gold, this.silver, 0)
  }

  get weight_str() {
    return this.weight.toLocaleString()
  }

}