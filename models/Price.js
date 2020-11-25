export default class Price {

  constructor(gold, silver, copper) {
    this.gold = gold || 0
    this.silver = silver || 0
    this.copper = copper || 0
  }

  add(otherPrice){
    new Price(
      this.gold + otherPrice.gold,
      this.silver + otherPrice.silver,
      this.copper + otherPrice.copper,
      )
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

  toString() {
    if(!this['asString']){
      this['asString'] = Price.price_str(this.gold, this.silver, this.copper)
    }
    return this['asString']
  }
  toLocaleString(){
    return this.toString()
  }


}
