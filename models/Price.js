export default class Price {

  constructor(gold, silver, copper) {
    this.gold = Math.round(gold) || 0
    this.silver = Math.round(silver) || 0
    this.copper = Math.round(copper) || 0
  }

  add(otherPrice){
    return new Price(
      this.gold + otherPrice.gold,
      this.silver + otherPrice.silver,
      this.copper + otherPrice.copper,
      )
  }

  times(number) {
    return new Price(
      this.gold * number,
      this.silver * number,
      this.copper * number,
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
    if (items.length == 0){
      return '0 GP'
    } else {
      return items.join(', ')
    }
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
