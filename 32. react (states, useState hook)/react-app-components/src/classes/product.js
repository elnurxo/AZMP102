import { nanoid } from "nanoid";

export class Product {
  constructor(name, salePrice, costPrice, discountPercentage) {
    this.id = nanoid();
    this.name = name;
    this.costPrice = costPrice;
    if (salePrice < costPrice) {
      this.salePrice = costPrice;
    } else {
      this.salePrice = salePrice;
    }
    if (discountPercentage >= 0 && discountPercentage <= 100) {
      this.discountPercentage = discountPercentage;
    } else {
      this.discountPercentage = 0;
    }
  }

  calculateProfit() {
    const profit =
      this.salePrice -
      (this.salePrice * this.discountPercentage) / 100 -
      this.costPrice;
    return profit;
  }

  calcSalePrice() {
    if (this.discountPercentage > 0) {
      return (
        this.salePrice -
        (this.salePrice * this.discountPercentage) / 100
      ).toFixed(2);
    } else {
      return this.salePrice;
    }
  }
}
