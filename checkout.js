const defaultPromotionalRules = {
  total: { discount: 10, minimum: 60 },
  items: {
    '001': { price: 8.5, minimum: 2 },
  }
};

class Checkout {
  constructor(promotional_rules = defaultPromotionalRules) {
    this.promotional_rules = promotional_rules;
    this.items = [];
    this.cart = {};
  }

  scan(item) {
    this.items = [...this.items, item];
    this.cart = this._optimiseCart(this.items);
    return this;
  }

  total() {
    let totalPreDiscount = Object.keys(this.cart)
      .reduce((acc, itemCode) => acc += this.cart[itemCode].price * this.cart[itemCode].qty, 0);

    // apply a discount to the total price if necessary
    if (totalPreDiscount >= this.promotional_rules.total.minimum)
      totalPreDiscount -= totalPreDiscount * this.promotional_rules.total.discount / 100;

    return Math.round(totalPreDiscount * 100) / 100; // Round to at most 2 decimal places
  }

  _optimiseCart(items) {
    return items.reduce((acc, item) => {
      if (!acc.hasOwnProperty(item.code)) {
        acc[item.code] = {
          code: item.code,
          name: item.name,
          price: Number(item.price.replace(/[^0-9\.-]+/g, "")),
          qty: 1
        }
      } else {
        acc[item.code].qty += 1;
        acc[item.code].price = this._applyItemDiscount(this.promotional_rules, acc[item.code]);
      }

      return acc;
    }, {});
  }

  _applyItemDiscount(rules, item) {
    return rules.items.hasOwnProperty(item.code) && item.qty >= rules.items[item.code].minimum
      ? rules.items[item.code].price
      : item.price;
  }
}

module.exports = Checkout;
