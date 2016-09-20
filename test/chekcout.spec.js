var expect = require('chai').expect;
var Checkout = require('../checkout');

describe('Checkout', () => {

  describe('Structure', () => {
    it('should have a "scan" public method', () => {
      const co = new Checkout();
      expect(co).to.respondTo('scan');
    });

    it('should have a "total" public method', () => {
      const co = new Checkout();
      expect(co).to.respondTo('total');
    });
  })

  describe('Basic functionality', () => {
    let co;

    beforeEach(() => {
      co = new Checkout();
      co.scan({code: '001', name: 'Article 1', price: '£1'});
      co.scan({code: '002', name: 'Article 2', price: '£2'});
    })

    it('should scan items and store them', () => {
      expect(co.items).to.deep.equal([
        {code: '001', name: 'Article 1', price: '£1'},
        {code: '002', name: 'Article 2', price: '£2'}
      ]);
    });

    it('should calculate the total price', () => {
      expect(co.total()).to.equal(3);
    });
  })

  it('should apply 10% discount if you spend over £60');
  it('should drop the price of "lavender hearts" to £8.5 when buying 2 or more');
  it('should apply custom promotional rules');
})
