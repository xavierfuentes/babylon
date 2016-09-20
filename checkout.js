class Checkout {
  constructor() {
    this.items = [];
  }

  scan(item) {
    this.items = [...this.items, item];
    return this;
  }

  total() {}
}

module.exports = Checkout;
