var expect = require('chai').expect;
var Checkout = require('../checkout');

describe('Checkout', () => {
  it('should have a "scan" public method', () => {
    const co = new Checkout();
    expect(co).to.respondTo('scan');
  });

  it('should have a "total" public method', () => {
    const co = new Checkout();
    expect(co).to.respondTo('total');
  });

  it('should calculate the total price');
  it('should apply 10% discount if you spend over £60');
  it('should drop the price of "lavender hearts" to £8.5 when buying 2 or more');
  it('should apply custom promotional rules');
})
