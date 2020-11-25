import Price from "models/Price"

export default class Basket {
  constructor(items, counts) {
    this.items = items || {}
    this.counts = counts || {}
  }

  productCountPairs() {
    return Object.entries(this.items).map((idAndProduct) => {
      const [id, product] = idAndProduct
      return [product, this.counts[id]]
    })
  }

  totalPrice() {
    return this.productCountPairs().reduce((runningTotal, productAndCount) => {
      const [product, count] = productAndCount;
      return runningTotal.add(product.price.times(count))
    }, new Price())
  }

  addToBasket(product) {
    this.items[product.id] = product
    this.counts[product.id] = this.counts[product.id] + 1
    return new Basket(this.items, this.counts)
  }

  removeFromBasket(product) {
    this.counts[product.id] = this.counts[product.id] -  1
    if (this.counts[product.id] < 1) {
      delete this.counts[product.id]
      delete this.items[product.id]
    }
    return new Basket(this.items, this.counts)
  }

}