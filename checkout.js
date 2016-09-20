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
  }

  scan(item) {
    this.items = [...this.items, item];
    return this;
  }

  total() {
    let totalPreDiscount = this.items
      .map(this._simplifyItem)
      .reduce((total, item) => total + item.price, 0);

    // apply a discount to the total price if necessary
    if (totalPreDiscount >= this.promotional_rules.total.minimum)
      totalPreDiscount -= totalPreDiscount * this.promotional_rules.total.discount / 100;

    return Math.round(totalPreDiscount * 100) / 100; // Round to at most 2 decimal places
  }

  _simplifyItem(item) {
    return {
      code: item.code,
      price: Number(item.price.replace(/[^0-9\.-]+/g, "")),
    };
  }
}

module.exports = Checkout;
