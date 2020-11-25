import Price from "models/Price"

export default class Basket {
  constructor() {
    this.items = {}
  }

  addToBasket(product) {
    this.items[product] = this.items[product] || 0
    this.items[product] = this.items[product] + 1
  }

  removeFromBasket(product) {
    if (this.items[product]){
      this.items[product] = this.items[product] - 1
      if (this.items[product] <= 0) {
        delete this.items[product]
      }
    }
  }

  totalPrice() {
    let runningTotal = new Price();
    for(const [product, count] of productCountPairs){
      runningTotal = runningTotal.add(product.price.times(count))
    }
    return runningTotal
  }

  productCountPairs() {
    Object.entries(this.items)
  }

}