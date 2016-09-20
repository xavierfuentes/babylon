class Checkout {
  constructor() {
    this.items = [];
  }

  scan(item) {
    this.items = [...this.items, item];
    return this;
  }

  total() {
    return this.items.reduce((total, item) => {
      return total + Number(item.price.replace(/^£/, ""));
    }, 0);
  }
}

module.exports = Checkout;
